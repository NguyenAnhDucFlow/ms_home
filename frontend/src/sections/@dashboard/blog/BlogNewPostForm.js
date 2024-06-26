import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Grid, Card, Stack, Button, Typography, TextField, MenuItem } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFTextField, RHFUploadSingleFile, RHFSelect } from '../../../components/hook-form';
//
import BlogNewPostPreview from './BlogNewPostPreview';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function BlogNewPostForm() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  const NewBlogSchema = Yup.object().shape({
    fullName: Yup.string().required("Họ và tên không được để trống"),
    phoneNumber: Yup.string()
      .required('Vui lòng nhập số điện thoại của bạn.')
      .matches(phoneRegExp, 'Số điện thoại không hợp lệ.'),
    cover: Yup.mixed().required('Cover is required'),
    money: Yup.number().required('Vui lòng nhập số tiền đi.').typeError('Vui lòng nhập số tiền đi'),
    propertyType: Yup.string().required('Vui lòng chọn loại bất động sản.'),
    amenities: Yup.string(),
    description: Yup.string().required('Vui lòng nhập mô tả chi tiết'),
    conditions: Yup.string(),
  });

  const defaultValues = {
    cover: null,
    address: '',
    furniture: '',
    phoneNumber: '',
    fullName: '',
    quantityOfRooms: '0',
    area: '',
    money: '',
    propertyType: '',
    amenities: '',
    description: '',
    conditions: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      handleClosePreview();
      enqueueSnackbar('Post success!');
      navigate(PATH_DASHBOARD.blog.posts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'cover',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <RHFTextField
                      name='fullName'
                      id="outlined-required"
                      label="Họ và tên *"
                      placeholder="VD: Nguyễn Văn A"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <RHFTextField
                      name='phoneNumber'
                      id="outlined-required"
                      label="Số điện thoại *"
                      placeholder="VD: 0902797237"
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <RHFSelect
                  name="propertyType"
                  label="Loại bất động sản *"
                  fullWidth
                >
                  <MenuItem value="apartment">Căn hộ</MenuItem>
                  <MenuItem value="house">Nhà phố</MenuItem>
                  <MenuItem value="villa">Biệt thự</MenuItem>
                  <MenuItem value="land">Đất trống</MenuItem>
                </RHFSelect>

                <RHFTextField name="address" label="Địa chỉ *" placeholder="VD: 29 Liên Phường, Phường Phú Hữu" fullWidth />
                <RHFTextField name="furniture" label="Nội thất (nếu có)" placeholder="VD: Máy lạnh, tủ lạnh" fullWidth />
                <RHFTextField name="amenities" label="Tiện ích" placeholder="VD: Hồ bơi, phòng gym" fullWidth />
                <RHFTextField name="description" label="Mô tả chi tiết *" placeholder="Mô tả tổng quan về bất động sản" multiline rows={3} fullWidth />
                <RHFTextField name="conditions" label="Điều kiện thuê" placeholder="Yêu cầu tiền đặt cọc, thời gian thuê tối thiểu, ..." multiline rows={3} fullWidth />

                <div>
                  <LabelStyle>Cover</LabelStyle>
                  <RHFUploadSingleFile name="cover" accept="image/*" maxSize={3145728} onDrop={handleDrop} />
                  <Typography variant="caption" color="textSecondary">
                    (Dung lượng tối đa: 3MB, Định dạng: .jpg, .png)
                  </Typography>
                </div>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField
                  name='money'
                  id="outlined-required"
                  label="Giá cho thuê *"
                  placeholder="VD: 3000000"
                  fullWidth
                />
                <RHFTextField
                  name='quantityOfRooms'
                  label="Số lượng phòng"
                  type="number"
                  fullWidth
                />
                <RHFTextField
                  name='area'
                  label="Diện tích"
                  placeholder="VD: 75 mét vuông"
                  fullWidth
                />
              </Stack>
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <Button fullWidth color="inherit" variant="outlined" size="large" onClick={handleOpenPreview}>
                Preview
              </Button>
              <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                Post
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>

      <BlogNewPostPreview
        values={values}
        isOpen={open}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      />
    </>
  );
}
