import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function MemberCard({ member }) {
  return (
    <Card sx={{
      height: {xs: '25vh', sm: '23vh'},
      borderRadius: 0,
      boxShadow: 'none'
    }}>
      <CardMedia sx={{
        height: '18vh',
      }}
        component="img"
        alt={member.name}
        image={`${process.env.REACT_APP_IMAGE_URL}/${member.image}`}
      />
      <CardContent sx={{ padding: "0" }}>
        <CardActions sx={{ padding: "0", whiteSpace: 'nowrap', fontSize: '12px' }}>
          {member.name}
        </CardActions>
        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap', fontSize: '10px'}}>
          {member.subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

MemberCard.propTypes = {
  member: PropTypes.array.isRequired
};
