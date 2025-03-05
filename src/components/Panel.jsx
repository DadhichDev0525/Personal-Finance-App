import classNames from "classnames"
const Panel = ({children, className,...rest}) => {

    const PanelClass = classNames('p-6 bg-white shadow-md rounded-lg  ',className)
  return (
    <div className={PanelClass} {...rest} >
        {children}
    </div>
  )
}

export default Panel