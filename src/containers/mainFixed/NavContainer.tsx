import React,{useRef, useState, useEffect} from 'react';
import Navbar from '../../components/Header/Navbar';
import NavItem from '../../components/Header/NavItem'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ForumIcon from '@material-ui/icons/Forum';
import DropDown from '../../components/Header/DropDown';


const NavContainer = () => {

    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('primary');
    const [menuHeight, setMenuHeight] = useState<any>(null);
    
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(dropdownRef.current)
            setMenuHeight(dropdownRef.current?.offsetHeight)
    },[])
    

    

    const onCheckHeight = (e:any) => {
        setMenuHeight(e.offsetHeight)
    }
    const onClickDropdown = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setOpen(!open);
    }

    const onClickMenu = (anchor:string) => {
        setActive(anchor);
    }
    return (
        <>
            <Navbar>
                <NavItem icon={<ForumIcon/>}/>
                <NavItem icon={<NotificationsIcon/>}/>
                <NavItem icon={<ArrowDropDownIcon/>} open={open} onClick={onClickDropdown} >
                    <DropDown 
                        dropdownRef={dropdownRef}
                        active={active}
                        menuHeight={menuHeight}
                        onCheckHeight={onCheckHeight}  
                        onClickMenu ={onClickMenu}
                    />
                </NavItem>
            </Navbar>
        </>

    )
}

export default NavContainer;