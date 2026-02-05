/**
 * Primary action button component
 * Brown background, white text, 48px height
 * @param {boolean} fullWidth - If true, button is full width. Default is 162px width.
 */
const Button = ({ children, onClick, type = 'button', fullWidth = false, className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        ${fullWidth ? 'w-full' : 'w-[162px]'} h-12 
        bg-valentine-brown text-white 
        font-sans font-medium text-base
        rounded-lg
        transition-opacity hover:opacity-90 active:opacity-80
        cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>
  )
}

export default Button
