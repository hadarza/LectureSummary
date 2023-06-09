import {React,useRef,useState,useEffect} from 'react'
import {images} from '../../constants'
import {BiSearch} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import {FetchFoldersByName} from '../../Redux/features/DashBoard/DashBoardSlice'
import { useSelector,useDispatch } from 'react-redux';
import {setEditMode,IsEditMode} from '../../Redux/features/DashBoard/DashBoardSlice'

const NavDashBoard = () => {
    const navigate = useNavigate();
    const UploadingFolders = useRef(null)
    const [searchText, setsearchText] = useState("")

    const BtnEditMode = useRef(null);
    BtnEditMode.current = "מצב עריכה";
    const [EditText, setEditText] = useState(BtnEditMode.current);

    const dispatch = useDispatch()
    const EditMode = useSelector(IsEditMode)

    // toggle edit mode for admin user
    const ToggleEditMode = () =>{
        dispatch(setEditMode(!EditMode))

        if(!EditMode) BtnEditMode.current = "צא ממצב עריכה";
        else BtnEditMode.current = "מצב עריכה"

        setEditText(BtnEditMode.current)
    }    

    const searchByName = ()=>{
        //search by name file in our DB
        dispatch(FetchFoldersByName(searchText))
    }

    const UploadNewFiles = () =>{
        // Admin - able to upload new files to dashBoard
        navigate(`../AdminUploadFile`, {state: {file: null }});
    }

    useEffect(() => {
        if(UploadingFolders.current != null){
            if(!EditMode) UploadingFolders.current.style.visibility="hidden";
            else UploadingFolders.current.style.visibility="visible";
        }
    }, [dispatch,EditMode])

  return (
    <div className='Nav-DashBoard'>
       
        <div className='search'>
            <input className='input-search' type="text" placeholder='חפש קובץ...' value={searchText} onChange={(e)=>{setsearchText(e.currentTarget.value)}} />
            <BiSearch className='search-icon' onClick={()=>{searchByName()}}/>
        </div>

        {(localStorage.getItem("isAdmin")) && <>
            <button className='editMode' ref={UploadingFolders} onClick={()=>{UploadNewFiles()}}>העלאת קבצים נוספים </button>
            <button ref={BtnEditMode} className='editMode' onClick={()=>{ToggleEditMode()}}>{EditText} </button>
        </>}

        <div className='logos'>
            <img className='WonderTeam_logo' src={images.WonderTeam}/>
            <img className="Hebet_logo" src={images.Hebet}/>
        </div>
    </div>
  )
}

export default NavDashBoard