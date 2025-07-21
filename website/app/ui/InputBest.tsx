const InputComponent = ({ size, placeholder, icon, tool, onToolClick }) => {
  // Style Object for Input based on size
  const InputBest = {
    padding: size === 'large' ? '12px 20px' : size === 'medium' ? '8px 15px' : '5px 10px',
    fontSize: size === 'large' ? '16px' : size === 'medium' ? '14px' : '12px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%',
    outline: 'none',
  };

  return (
    <div className="input-wrapper">
      {icon && <span className="input-icon">{icon}</span>}
      <input 
        type="text" 
        placeholder={placeholder} 
        style={inputStyles} 
        className="input-field" 
      />
      {tool && (
        <button className="input-tool" onClick={onToolClick}>
          {tool}
        </button>
      )}
    </div>
  );
};


InpInputBest.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired, // Control input size
  placeholder: PropTypes.string, // Placeholder text
  icon: PropTypes.element, // Optional icon for the left side of the input
  tool: PropTypes.element, // Optional button or tool in the input
  onToolClick: PropTypes.func, // Function to call on tool click (like clear or search)
};

InputComponent.defaultProps = {
  placeholder: 'Enter text...',
};

export default InpInputBest;