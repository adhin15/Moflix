const IconContainer = (props) =>{
    return(
        <div className="bg-secondary-bg rounded-full w-[46px] h-[46px] flex items-center justify-center mx-2">
            {props.children}
        </div>
    )
}

export default IconContainer;