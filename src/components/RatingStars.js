const RatingStars = ({ rating }) => {
  const style = { width: `${rating * 10}%` };
  return (
    <div className='rating'>
      <div className='star-ratings-sprite'>
        <span style={style} className='star-ratings-sprite-rating'></span>
      </div>
    </div>
  );
};

export default RatingStars;
