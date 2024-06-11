// @mui
import { styled } from '@mui/material/styles';
import { Divider, Box, Typography, Grid, Container } from '@mui/material';
// components
import Page from '../components/Page';
import { AboutHero, AboutWhat, AboutTeam, AboutVision, AboutTestimonials } from '../sections/about';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function About() {
  return (
    <Page title="About us">
      <RootStyle>
        <AboutHero />

        <Container sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h1" gutterBottom>
                Chúng tôi là MsHome
              </Typography>
              <Typography variant="body1" paragraph>
                MsHome ra đời từ chính những trăn trở của những sinh viên khi phải đối mặt với những vấn đề nhà ở, dọn
                nhà, chuyển nhà và tìm bạn ở ghép.
              </Typography>
              <Typography variant="body1" paragraph>
                MsHome chính thức ra mắt vào năm 2024 với mục tiêu "Mở khóa cuộc sống sinh viên tiện ích". Chúng tôi
                mong muốn mang đến cho sinh viên những trải nghiệm tiện lợi, an toàn và tiết kiệm nhất trong việc tìm
                kiếm nhà ở, dọn nhà, chuyển nhà và tìm bạn ở ghép.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <img src="/image/EXE-logo.png" alt="MsHome Logo" style={{ maxWidth: '100%', height: 'auto' }} />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <img src="/image/EXE-map.png" alt="Map" style={{ maxWidth: '100%', height: 'auto' }} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                Khu vực hoạt động của MsHome
              </Typography>
              <Typography variant="body1" paragraph>
                Hiện tại, MsHome đang hỗ trợ các bạn sinh viên tìm kiếm nhà trọ và cung cấp các tiện ích ở khu vực thành
                phố Thủ Đức.
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                Tầm nhìn
              </Typography>
              <Typography variant="body1" paragraph>
                Với mong muốn trở thành website hàng đầu dành cho sinh viên đang tìm nơi ở xa nhà, MsHome đang nỗ lực
                tạo ra một cộng đồng sinh viên có thể chia sẻ kinh nghiệm, thách thức và giải pháp liên quan đến việc
                thuê nhà.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <img src="/image/EXE-vision.png" alt="Vision" style={{ maxWidth: '100%', height: 'auto' }} />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                Sứ mệnh
              </Typography>
              <Typography variant="body1" paragraph>
                Cung cấp trải nghiệm tìm kiếm nhà ở thuận tiện và an toàn cho sinh viên bằng cách cung cấp một nền tảng
                tiện dụng và dễ sử dụng bằng cách kết nối sinh viên với chủ thuê đang tin cậy và kiến tạo dịch vụ vận
                chuyển đồ đạc đẹp và chuyên nghiệp, mang lại sự thuận tiện, thoải mái nhất cho sinh viên.
              </Typography>
              <Typography variant="body1" paragraph>
                Cung cấp giảm giá, lời khuyên và đánh giá để giúp sinh viên tìm được những ưu đãi và dịch vụ tốt nhất
                cho nhu cầu của họ.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <img src="/image/EXE-vision.png" alt="Mission" style={{ maxWidth: '100%', height: 'auto' }} />
              </Box>
            </Grid>
          </Grid>

          <Box className="gi-tr-ct-li" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h2" align="center" gutterBottom>
              Giá trị cốt lõi
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={3}>
                <Box className="frame-38" textAlign="center">
                  {/* <Box className="sketch-logo" mb={2}>
                    <img className="vector" src="assets/vectors/Vector410_x2.svg" alt="Chất lượng" />
                  </Box> */}
                  <Typography variant="h6" component="h3" gutterBottom>
                    Chất lượng
                  </Typography>
                  <Typography variant="body2">
                    MsHome ưu tiên sự an toàn và thoải mái của sinh viên bằng cách đảm bảo các tiêu chuẩn nhà ở chất
                    lượng cao về mặt bảo trì, sạch sẽ và an ninh.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box className="frame-40" textAlign="center">
                  {/* <Box className="sketch-logo-1" mb={2}>
                    <img className="vector-1" src="assets/vectors/Vector347_x2.svg" alt="Tận tâm" />
                  </Box> */}
                  <Typography variant="h6" component="h3" gutterBottom>
                    Tận tâm
                  </Typography>
                  <Typography variant="body2">
                    MsHome tận tâm phục vụ nhu cầu của sinh viên, ưu tiên sự thoải mái và an toàn, đồng thời làm cho
                    trải nghiệm thuê nhà của họ trở nên tích cực và hỗ trợ.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box className="frame-41" textAlign="center">
                  {/* <Box className="sketch-logo-2" mb={2}>
                    <img className="vector-2" src="assets/vectors/Vector113_x2.svg" alt="Tiện lợi" />
                  </Box> */}
                  <Typography variant="h6" component="h3" gutterBottom>
                    Tiện lợi
                  </Typography>
                  <Typography variant="body2">
                    MsHome phục vụ các nhu cầu đa dạng với các gói dịch vụ có thể tùy chỉnh và các tùy chọn lập lịch
                    trình thuận tiện để phù hợp với lối sống của sinh viên.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box className="frame-42" textAlign="center">
                  {/* <Box className="sketch-logo-3" mb={2}>
                    <img className="vector-3" src="assets/vectors/Vector57_x2.svg" alt="Tử tế" />
                  </Box> */}
                  <Typography variant="h6" component="h3" gutterBottom>
                    Tử tế
                  </Typography>
                  <Typography variant="body2">
                    MsHome duy trì liên lạc rõ ràng và cởi mở với sinh viên về tiền thuê nhà, phí, thời hạn dịch vụ và
                    mọi vấn đề tiềm ẩn.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* <Box sx={{ mt: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Đối tác của MsHome
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box className="container-1">
                  <Box className="btaskee" mb={2}>
                    <Typography variant="body2">
                      Ứng dụng dịch vụ gia đình số 1 tại Việt Nam
                    </Typography>
                  </Box>
                  <Box className="saigon-express" mb={2}>
                    <img className="ellipse-19" src="assets/vectors/Ellipse191_x2.svg" alt="Saigon Express" style={{ borderRadius: '50%', width: 50, height: 50, mb: 1 }} />
                    <Typography variant="body2">
                      Dịch vụ chuyển nhà trọn gói
                    </Typography>
                  </Box>
                  <Box className="i-hc-fpt" mb={2}>
                    <Typography variant="body2">
                      Đại học FPT
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box className="i-hc-quc-gia">
                  <Typography variant="body2">
                    Đại học Quốc Gia TPHCM
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box> */}

          {/* Support Section */}
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" component="h3" gutterBottom>
                  Chúng tôi sẵn sàng hỗ trợ bạn
                </Typography>
                <Typography variant="body1" paragraph>
                  Khi có bất kỳ thắc mắc, bạn chỉ cần chạm nhẹ, chúng tôi sẽ giải đáp cho bạn.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
