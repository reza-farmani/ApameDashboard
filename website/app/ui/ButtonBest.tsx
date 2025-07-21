
import PropTypes from 'prop-types';

interface ButtonBestProps {
  size: 'xl' | 'md' | 'lg';
  bgcolor: string;
  value: string;
  textColor: string;
}

// Button Component
const ButtonBest = ({ size, bgcolor, value, textColor }: ButtonBestProps) => {
  // Style object for button
  const buttonStyles = {
    backgroundColor: bgcolor,
    padding: size === 'lg' ? '15px 45px' : size === 'md' ? '10px 30px' : '17px 55px',
    fontSize: size === 'md' ? '16px' : size === 'lg' ? '18px' : '20px',
    fontFamily: 'sans-bold',
    border: 'none',
    borderRadius: '10px',
    color: textColor,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  return <button style={buttonStyles} className='hover:opacity-60 duration-300 hover:scale-105'>{value}</button>;
};

ButtonBest.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
  bgcolor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};


export default ButtonBest;