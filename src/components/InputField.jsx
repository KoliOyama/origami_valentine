import { UserHeart } from '@solar-icons/react'

/**
 * Styled input field with icon and label
 * Outlined style with person icon on left
 */
const InputField = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  name,
  required = false 
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label 
        htmlFor={name}
        className="font-sans text-sm text-neutral-800"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-valentine-brown/60">
          <UserHeart size={20} />
        </div>
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="
            w-full h-12 pl-10 pr-4
            bg-white
            border border-gray-200
            rounded-lg
            font-sans text-base text-neutral-800
            placeholder:text-valentine-brown/40
            focus:outline-none focus:border-valentine-brown/50
            transition-colors
          "
        />
      </div>
    </div>
  )
}

export default InputField
