
const { useSelector } = ReactRedux

export function Background() {
    const style = useSelector(storeState => storeState.styleModule)

    return (
        <div className="bg" style={{'background': style.backgroundColor || '#f4f4f4'}}>blah</div>
    )
}
