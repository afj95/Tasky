export const animateList = (_list) => {
    setTimeout(() => {
        _list.current.scrollToOffset({
            offset: 20,
            animated: true
        })
    }, 0)
    setTimeout(() => {
        _list.current.scrollToOffset({
            offset: 40,
            animated: true
        })
    }, 20)
    setTimeout(() => {
        _list.current.scrollToOffset({
            offset: 60,
            animated: true
        })
    }, 40)
    setTimeout(() => {
        _list.current.scrollToOffset({
            offset: 80,
            animated: true
        })
    }, 60)
    setTimeout(() => {
        _list.current.scrollToOffset({
            offset: 100,
            animated: true
        })
    }, 80)

    // ========================================================

    setTimeout(() => {
        _list.current.scrollToOffset({
            offset: 80,
            animated: true
        })
    }, 100)
    setTimeout(() => {
        _list.current.scrollToOffset({
            offset: 60,
            animated: true
        })
    }, 120)
    setTimeout(() => {
        _list.current.scrollToOffset({
            offset: 40,
            animated: true
        })
    }, 140)
    setTimeout(() => {
        _list.current.scrollToOffset({
            offset: 20,
            animated: true
        })
    }, 160)
    setTimeout(() => {
        _list.current.scrollToOffset({
            offset: 0,
            animated: true
        })
    }, 180)
}