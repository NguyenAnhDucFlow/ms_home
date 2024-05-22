// @mui
import { Grid, Container, Typography } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
  AnalyticsWebsiteVisits,
  AnalyticsWidgetSummary,
} from '../../sections/@dashboard/general/analytics';

// ----------------------------------------------------------------------

export default function MsHome() {
  const { themeStretch } = useSettings();

  return (
    <Page title="MsHome">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="Số hợp đồng" total={714000} icon={'teenyicons:contract-outline'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="Số lượng đối tác" total={1352831} color="info" icon={'carbon:partnership'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Doanh thu"
              total={1723315}
              color="warning"
              icon={'streamline:dollar-coin'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="Người dùng" total={234} color="error" icon={'tdesign:user'} />
          </Grid>

          <Grid item xs={12}>
            <AnalyticsWebsiteVisits />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
