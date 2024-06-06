import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
  Autocomplete,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadMultiFile,
} from '../../../components/hook-form';
// API
import axios from '../../../utils/axios';
// ----------------------------------------------------------------------

const PROPERTY_TYPE_OPTION = ['Apartment', 'House', 'Condo', 'Townhouse'];

const AMENITIES_OPTION = [
  'Air Conditioning',
  'Swimming Pool',
  'Garden',
  'Garage',
  'Fitness Center',
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const FormItem = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

PropertyListingForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProperty: PropTypes.object,
};

export default function PropertyListingForm({ isEdit, currentProperty }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const PropertySchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is mandatory'),
    phoneNumber: Yup.string().required('Phone number is mandatory').matches(/^\+?\d{10,15}$/, 'Invalid phone number'),
    title: Yup.string().required('Title is mandatory'),
    description: Yup.string().required('Description is mandatory'),
    price: Yup.number().moreThan(0, 'Price must be greater than zero'),
    address: Yup.string().required('Address is mandatory'),
    propertyType: Yup.string().required('Property type is mandatory'),
    images: Yup.array().min(1, 'At least one image is required'),
  });

  const defaultValues = useMemo(
    () => ({
      fullName: currentProperty?.fullName || '',
      phoneNumber: currentProperty?.phoneNumber || '',
      title: currentProperty?.title || '',
      description: currentProperty?.description || '',
      price: currentProperty?.price || 0,
      address: currentProperty?.address || '',
      propertyType: currentProperty?.propertyType || PROPERTY_TYPE_OPTION[0],
      amenities: currentProperty?.amenities || [],
      conditions: currentProperty?.conditions || '',
      images: currentProperty?.images || [],
    }),
    [currentProperty]
  );

  const methods = useForm({
    resolver: yupResolver(PropertySchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentProperty) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentProperty, reset, defaultValues]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === 'images') {
          data.images.forEach((file) => {
            formData.append('multipartFile', file);
          });
        } else {
          formData.append(key, data[key]);
        }
      });

      if (isEdit) {
        await axios.put(`/api/listings/${currentProperty.id}`, formData);
        enqueueSnackbar('Update success!', { variant: 'success' });
      } else {
        await axios.post('/api/listings', formData);
        enqueueSnackbar('Create success!', { variant: 'success' });
      }
      // navigate(PATH_DASHBOARD.realEstate.list);
    } catch (error) {
      enqueueSnackbar('An error occurred. Please try again.', { variant: 'error' });
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setValue(
        'images',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setValue]
  );

  const handleRemoveAll = () => {
    setValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images?.filter((_file) => _file !== file);
    setValue('images', filteredItems);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <FormItem>
                <RHFTextField name="fullName" label="Full Name" />
              </FormItem>

              <FormItem>
                <RHFTextField name="phoneNumber" label="Phone Number" />
              </FormItem>

              <FormItem>
                <RHFTextField name="title" label="Title" />
              </FormItem>

              <FormItem>
                <LabelStyle>Description</LabelStyle>
                <RHFEditor simple name="description" />
              </FormItem>

              <FormItem>
                <LabelStyle>Images</LabelStyle>
                <RHFUploadMultiFile
                  name="images"
                  showPreview
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                />
              </FormItem>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Price & Address</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormItem>
                    <RHFTextField
                      name="price"
                      label="Price"
                      placeholder="0.00"
                      value={getValues('price') === 0 ? '' : getValues('price')}
                      onChange={(event) => setValue('price', Number(event.target.value))}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        type: 'number',
                      }}
                    />
                  </FormItem>

                  <FormItem>
                    <RHFTextField name="address" label="Address" />
                  </FormItem>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Property Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormItem>
                    <RHFSelect name="propertyType" label="Property Type">
                      {PROPERTY_TYPE_OPTION.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </RHFSelect>
                  </FormItem>

                  <FormItem>
                    <Controller
                      name="amenities"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          multiple
                          freeSolo
                          onChange={(event, newValue) => field.onChange(newValue)}
                          options={AMENITIES_OPTION.map((option) => option)}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                            ))
                          }
                          renderInput={(params) => <TextField label="Amenities" {...params} />}
                        />
                      )}
                    />
                  </FormItem>

                  <FormItem>
                    <RHFTextField name="conditions" label="Conditions" />
                  </FormItem>
                </AccordionDetails>
              </Accordion>
            </Card>

            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!isEdit ? 'Create Listing' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
