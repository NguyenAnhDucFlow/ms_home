import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../../hooks/useAuth';
// utils
import { fData } from '../../../../utils/formatNumber';
// _mock
import { countries } from '../../../../_mock';
import axios from '../../../../utils/axios';
// components
import { FormProvider, RHFSwitch, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    phone: Yup.string(),
    address: Yup.string(),
    country: Yup.string(),
    state: Yup.string(),
    city: Yup.string(),
    about: Yup.string(),
    gender: Yup.string().oneOf(['MALE', 'FEMALE', 'ORDER']),
    profilePicture: Yup.mixed(),
  });

  const defaultValues = {
    username: user?.username || '',
    email: user?.email || '',
    profilePicture: user?.profilePicture || '',
    phone: user?.phone || '',
    country: user?.country || '',
    address: user?.address || '',
    state: user?.state || '',
    city: user?.city || '',
    about: user?.about || '',
    isPublic: user?.isPublic || false,
    gender: user?.gender || '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    getValues,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      const formData = new FormData();

      // Append each field individually
      formData.append('id', user.id);
      formData.append('username', getValues('username'));
      formData.append('email', getValues('email'));
      const photoFile = getValues('profilePicture');
      if (typeof photoFile !== "string") {
        formData.append('avatarFile', photoFile);
      } else {
        formData.append('profilePicture', photoFile);
      }
      formData.append('phone', getValues('phone'));
      formData.append('country', getValues('country'));
      formData.append('address', getValues('address'));
      formData.append('state', getValues('state'));
      formData.append('city', getValues('city'));
      formData.append('about', getValues('about'));
      formData.append('isPublic', getValues('isPublic'));
      formData.append('gender', getValues('gender'));

      const response = await axios.put('/api/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      enqueueSnackbar(response.data.message || 'Update success!');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Update failed', { variant: 'error' });
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'profilePicture',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="profilePicture"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />

            <RHFSwitch name="isPublic" labelPlacement="start" label="Public Profile" sx={{ mt: 5 }} />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="username" label="Username" />
              <RHFTextField name="email" label="Email Address" disabled />

              <RHFTextField name="phone" label="Phone Number" />
              <RHFTextField name="address" label="Address" />

              <RHFSelect name="country" label="Country" placeholder="Country">
                <option value="" />
                {countries.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="state" label="State/Region" />

              <RHFTextField name="city" label="City" />

              <RHFSelect name="gender" label="Gender">
                <option value="" />
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="ORDER">Order</option>
              </RHFSelect>
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFTextField name="about" multiline rows={4} label="About" />

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
