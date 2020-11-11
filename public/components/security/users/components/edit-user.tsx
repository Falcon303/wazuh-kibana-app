import React, { Fragment, useEffect, useRef, useState } from 'react';
import {
  EuiButton,
  EuiTitle,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiForm,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiSpacer,
  EuiBadge,
  EuiComboBox,
  EuiSwitch,
  EuiFieldPassword,
  EuiPanel,
} from '@elastic/eui';

import { useApiService } from '../../../common/hooks/useApiService';
import { Role } from '../../roles/types/role.type';
import { UpdateUser } from '../types/user.type';
import UsersServices from '../services';
import RolesServices from '../../roles/services';
import { ErrorHandler } from '../../../../react-services/error-handler';
import { useDebouncedEffect } from '../../../common/hooks/useDebouncedEffect';

export const EditUser = ({ currentUser, closeFlyout, rolesObject }) => {
  const userRolesFormatted =
    currentUser.roles && currentUser.roles.length
      ? currentUser.roles.map(item => ({ label: rolesObject[item], id: item }))
      : [];
  const [selectedRoles, setSelectedRole] = useState(userRolesFormatted);
  const [rolesLoading, roles, rolesError] = useApiService<Role[]>(RolesServices.GetRoles, {});
  const rolesOptions: any = roles
    ? roles.map(item => {
        return { label: item.name, id: item.id };
      })
    : [];

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [allowRunAs, setAllowRunAs] = useState<boolean>(currentUser.allow_run_as);
  const [formErrors, setFormErrors] = useState<any>({
    password: '',
    confirmPassword: '',
  });

  const passwordRef = useRef(false);
  useDebouncedEffect(
    () => {
      if (passwordRef.current) validateField('password');
      else passwordRef.current = true;
    },
    300,
    [password]
  );

  const confirmPasswordRef = useRef(false);
  useDebouncedEffect(
    () => {
      if (confirmPasswordRef.current) validateField('confirmPassword');
      else confirmPasswordRef.current = true;
    },
    300,
    [confirmPassword]
  );

  const validations = {
    password: [
      {
        fn: () =>
          password !== '' &&
          !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,64}$/)
            ? 'The password must contain a length between 8 and 64 characters, and must contain at least one upper and lower case letter, a number and a symbol.'
            : '',
      },
    ],
    confirmPassword: [{ fn: () => (confirmPassword !== password ? `Passwords don't match.` : '') }],
  };

  const validateField = field => {
    const error = validations[field].reduce((result, validation) => {
      return !!result ? result : validation.fn();
    }, '');
    setFormErrors({ ...formErrors, [field]: error });
    return !!error;
  };

  const isValidForm = () => {
    let errors = false;
    Object.keys(validations).forEach(field => {
      errors = errors || validateField(field);
    });
    return !errors;
  };

  const editUser = async () => {
    if (!isValidForm()) {
      ErrorHandler.warning('Please resolve the incorrect fields.');
      return;
    }

    setIsLoading(true);

    const userData: UpdateUser = {
      allow_run_as: allowRunAs,
    };

    if (password) {
      userData.password = password;
    }
    try {
      await Promise.all([UsersServices.UpdateUser(currentUser.id, userData), updateRoles()]);

      ErrorHandler.info('User was successfully updated');
      closeFlyout(false);
    } catch (error) {
      ErrorHandler.handle(error, 'There was an error');
      setIsLoading(false);
    }
  };

  const updateRoles = async () => {
    const formattedRoles = selectedRoles.map(item => item.id);
    const _userRolesFormatted = userRolesFormatted.map(role => role.id);
    const toAdd = formattedRoles.filter(value => !_userRolesFormatted.includes(value));    
    if (toAdd.length) await UsersServices.AddUserRoles(currentUser.id, toAdd);

    const toRemove = _userRolesFormatted.filter(value => !formattedRoles.includes(value));
    if (toRemove.length) await UsersServices.RemoveUserRoles(currentUser.id, toRemove);
  };

  const onChangeRoles = selectedRoles => {
    setSelectedRole(selectedRoles);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = e => {
    setConfirmPassword(e.target.value);
  };

  const onChangeAllowRunAs = e => {
    setAllowRunAs(e.target.checked);
  };

  return (
    <EuiFlyout onClose={() => closeFlyout()}>
      <EuiFlyoutHeader hasBorder={false}>
        <EuiTitle size="m">
          <h2>
            Edit {currentUser.username} user &nbsp; &nbsp;
            {currentUser.id < 3 && <EuiBadge color="primary">Reserved</EuiBadge>}
          </h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiForm component="form" style={{ padding: 24 }}>
          <EuiPanel>
            <EuiTitle size="s">
              <h2>Run as</h2>
            </EuiTitle>
            <EuiFormRow label="" helpText="Set if the user is able to use run as">
              <EuiSwitch
                label="Allow"
                showLabel={true}
                checked={allowRunAs}
                onChange={e => onChangeAllowRunAs(e)}
                aria-label=""
                disabled={currentUser.id < 3}
              />
            </EuiFormRow>
          </EuiPanel>
          <EuiSpacer />
          <EuiPanel>
            <EuiTitle size="s">
              <h2>Password</h2>
            </EuiTitle>
            <EuiFormRow
              label=""
              isInvalid={!!formErrors.password}
              error={formErrors.password}
              helpText="Introduce a new password for the user."
            >
              <EuiFieldPassword
                placeholder="Password"
                value={password}
                onChange={e => onChangePassword(e)}
                aria-label=""
                isInvalid={!!formErrors.password}
                disabled={currentUser.id < 3}
              />
            </EuiFormRow>
            <EuiFormRow
              label=""
              isInvalid={!!formErrors.confirmPassword}
              error={formErrors.confirmPassword}
              helpText="Confirm the new password."
            >
              <EuiFieldPassword
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => onChangeConfirmPassword(e)}
                aria-label=""
                isInvalid={!!formErrors.confirmPassword}
                disabled={currentUser.id < 3}
              />
            </EuiFormRow>
          </EuiPanel>
          <EuiSpacer />
          <EuiPanel>
            <EuiTitle size="s">
              <h2>Roles</h2>
            </EuiTitle>
            <EuiFormRow label="" helpText="Assign roles to the selected user">
              <EuiComboBox
                placeholder="Select roles"
                options={rolesOptions}
                selectedOptions={selectedRoles}
                isLoading={rolesLoading || isLoading}
                onChange={onChangeRoles}
                isClearable={true}
                data-test-subj="demoComboBox"
                isDisabled={currentUser.id < 3}
              />
            </EuiFormRow>
          </EuiPanel>

          <EuiSpacer />
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <EuiButton
                fill
                isLoading={isLoading}
                isDisabled={currentUser.id < 3}
                onClick={editUser}
              >
                Apply
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiForm>
      </EuiFlyoutBody>
    </EuiFlyout>
  );
};