import React from 'react';
import { Container, Typography, Grid, List, ListItem, ListItemText, ListItemIcon, Collapse, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

const FaqsList = () => {
  const [open, setOpen] = React.useState(null);

  const handleClick = (index) => {
    setOpen(open === index ? null : index);
  };

  const items = [
    'Website MsHome là gì?',
    'Website được triển khai ở đâu',
    'Phòng trọ có giống với hình ảnh được đăng lên không?',
    'Tôi muốn đặc các dịch vụ cùng lúc có được không?',
    'Vào dịp cao điểm có bị tăng giá phòng trọ không?',
    'Tôi có thể liên hệ với bộ phận CSKH Ms.Home ở đâu?'
  ];

  return (
    <RootStyle>
      <Container sx={{ mt: 15, mb: 10, position: 'relative' }}>
        <Typography variant="h3" sx={{ mb: 5 }}>
          Các câu hỏi thường xuyên
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <List component="nav">
              <ListItem>
                <ListItemText primary="1. Dịch vụ và ứng dụng Ms.home" />
              </ListItem>
              <ListItem>
                <ListItemText primary="2. Tài khoản" />
              </ListItem>
              <ListItem>
                <ListItemText primary="3. Hình thức thanh toán" />
              </ListItem>
              <ListItem>
                <ListItemText primary="4. Ms.Home" />
              </ListItem>
              <ListItem>
                <ListItemText primary="5. Chương trình ưu đãi" />
              </ListItem>
              <ListItem>
                <ListItemText primary="6. Mẹo chọn nhà phù hợp" />
              </ListItem>
              <ListItem>
                <ListItemText primary="7. Báo cáo sự cố" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={8}>
            <List component="nav">
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem button onClick={() => handleClick(index)}>
                    <ListItemText primary={item} />
                    {open === index ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={open === index} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem>
                        <ListItemText primary="Answer to the question..." />
                      </ListItem>
                    </List>
                  </Collapse>
                </React.Fragment>
              ))}
            </List>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
};

export default FaqsList;
