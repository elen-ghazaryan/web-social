import React from "react"

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>

export const ProfileImage:React.FC<ImageProps> = ({src, ...rest}) => {
  return (
    <img 
      src={!src ? import.meta.env.VITE_DEFAULT_PIC : import.meta.env.VITE_BASE + src }
      {...rest}
    />
  )
}