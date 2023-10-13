import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as CF from '../../config/function';
import { enum_api_uri } from "../../config/enum";
import util from "../../config/util";
import { appProfilePop, appProfilePop2, confirmPop } from "../../store/popupSlice";
import { profileData } from "../../store/userSlice";

import ConfirmPop from "../../components/popup/ConfirmPop";


const EditProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.user);
    const popup = useSelector((state)=>state.popup);
    const m_profile_info = enum_api_uri.m_profile_info;
    const m_nick_check = enum_api_uri.m_nick_check;
    const [confirm, setConfirm] = useState(false);
    const [tabOn, setTabOn] = useState(1);
    // const token = util.getCookie("token");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJzb2w3NzIxIiwidXNlckxldmVsIjoxLCJpYXQiOjE2OTcxNzk5NjQsImV4cCI6MTY5NzIyMzE2NH0.InIXZOyBH7TGA5pgohfAjopLAXmwFMM_8r65yiDKVZo";

    const [myInfo, setMyInfo] = useState({});
    const [myType, setMyType] = useState({});
    const [idealType, setIdealType] = useState({});

    const [inputFocus, setInputFocus] = useState({});

    const [valNickname, setValNickname] = useState("");
    const [valEmail, setValEmail] = useState("");
    const [usableNickname, setUsableNickname] = useState(true);
    const [usableEmail, setUsableEmail] = useState(true);
    const [errorNickname, setErrorNickname] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);

    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [height, setHeight] = useState("");
    const [height2, setHeight2] = useState(""); //상대방 키


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);



    //회원프로필정보 가져오기
    const getProfileInfo = () => {
        axios.get(`${m_profile_info}`,
            {headers:{Authorization: `Bearer ${token}`}}
        )
        .then((res)=>{
            if(res.status === 200){
                let data = res.data;

                //나의 기본정보
                setMyInfo(data.my_info);

                //나의 프로필정보
                setMyType(data.my_type);

                //나의 거주지
                

                //이상형 프로필정보
                setIdealType(data.ideal_type);
            }
        })
        .catch((error) => {
            const err_msg = CF.errorMsgHandler(error);
            dispatch(confirmPop({
                confirmPop:true,
                confirmPopTit:'알림',
                confirmPopTxt: err_msg,
                confirmPopBtn:1,
            }));
            setConfirm(true);
        })
    };


    //맨처음 회원프로필정보 가져오기
    useEffect(()=>{
        getProfileInfo();
    },[]);


    //회원 기본정보값 변경시 닉네임, 이메일값 변경
    useEffect(()=>{
        setValNickname(myInfo.m_n_name);
        setValEmail(myInfo.m_email);
    },[myInfo]);


    //닉네임, 이메일 인풋포커스 체크
    const inputFocusHandler = (data) => {
        setInputFocus((prevInputFocus) => {
            // 이전 상태를 복사
            const newInputFocus = { ...prevInputFocus };
        
            // data 객체를 반복하면서 값을 추가하거나 변경
            for (const key in data) {
                newInputFocus[key] = data[key];
            }
      
            return newInputFocus;
        });
    };


    // 닉네임 중복확인
    const nickCheckHandler = () => {
        if(valNickname.length < 2){
            setErrorNickname(true);
        }else{
            setErrorNickname(false);

            axios.get(`${m_nick_check}?m_n_name=${valNickname}`)
            .then((res)=>{
                if(res.status === 200){
                    setUsableNickname(true);

                    //닉네임 profileData store 값에 저장
                    let newData = {...user.profileData};
                    newData.m_n_name = valNickname;
                    dispatch(profileData(newData));
                }
            })
            .catch((error) => {
                const err_msg = CF.errorMsgHandler(error);
                setConfirm(true);
                dispatch(confirmPop({
                    confirmPop:true,
                    confirmPopTit:'알림',
                    confirmPopTxt:err_msg,
                    confirmPopBtn:1,
                }));
                setUsableNickname(false);
            })
        }
    };
    



    return(<>
        <div className="edit_profile_wrap">
            <ul className="top_tab flex_center">
                <li className={tabOn === 1 ? "on" : ""} onClick={()=>{setTabOn(1)}}><a href="#box1">기본 정보</a></li>
                <li className={tabOn === 2 ? "on" : ""} onClick={()=>{setTabOn(2)}}><a href="#box2">나의 프로필</a></li>
                <li className={tabOn === 3 ? "on" : ""} onClick={()=>{setTabOn(3)}}><a href="#box3">이상형 프로필</a></li>
            </ul>
            <div className="inner_cont">
                <div className="line_box" id="box1">
                    <p className="top_tit">기본 정보</p>
                    <ul className="gray_box">
                        <li className="flex_between">
                            <p>아이디</p>
                            <p>{myInfo.m_id}</p>
                        </li>
                        <li className="flex_between">
                            <p>이름</p>
                            <p>{myInfo.m_name}</p>
                        </li>
                        <li className="flex_between">
                            <p>생년월일</p>
                            <p>{myInfo.birth}</p>
                        </li>
                        <li className="flex_between">
                            <p>휴대폰번호</p>
                            <p>{myInfo.phone}</p>
                        </li>
                        <li className="flex_between">
                            <p>성별</p>
                            <p>{myInfo.m_gender}</p>
                        </li>
                    </ul>
                    <ul className="form_ul">
                        <li>
                            <p className="input_tit bm12">비밀번호</p>
                            <button type="button" className="app_btn_s w_100 normal">비밀번호 변경</button>
                        </li>
                        <li>
                            <p className="input_tit">닉네임</p>
                            <div className={`input_check_box ${usableNickname ? " checked" : ""}`}>
                                <div className={`custom_input2${inputFocus.hasOwnProperty("nick") && inputFocus.nick ? " on" : ""}`}>
                                    <input type={"text"} placeholder="닉네임을 입력해주세요." 
                                        value={valNickname}
                                        onChange={(e)=>{
                                            const val = e.currentTarget.value;
                                            setValNickname(val);
                                            if(val === myInfo.m_n_name){
                                                setUsableNickname(true);
                                            }else{
                                                setUsableNickname(false);
                                            }
                                        }}
                                        onFocus={()=>{
                                            let data = {nick:true};
                                            inputFocusHandler(data);
                                        }}
                                        onBlur={()=>{
                                            let data = {nick:false};
                                            inputFocusHandler(data);
                                        }}
                                    />
                                </div>
                                <button type="button" disabled={usableNickname ? true : false} onClick={nickCheckHandler}>중복 확인</button>
                            </div>
                            {errorNickname && <p className="alert_txt tp4">최소 2자 이상 입력하세요.</p>}
                        </li>
                        <li>
                            <p className="input_tit">이메일</p>
                            <div className={`custom_input2${inputFocus.hasOwnProperty("email") && inputFocus.email ? " on" : ""}`}>
                                <input type={"text"} placeholder="이메일을 입력해주세요." 
                                    value={valEmail}
                                    onChange={(e)=>{
                                        setValEmail(e.currentTarget.value);
                                        setUsableEmail(false);
                                    }}
                                    onFocus={()=>{
                                        let data = {email:true};
                                        inputFocusHandler(data);
                                    }}
                                    onBlur={()=>{
                                        let data = {email:false};
                                        inputFocusHandler(data);
                                    }}
                                />
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="line_box" id="box2">
                    <p className="top_tit">나의 프로필</p>
                    <ul className="form_ul">
                        <li>
                            <p className="input_tit">나의 거주지</p>
                            <div className="btn_sel_box2 flex_between">
                                <button type="button" className="btn_sel" 
                                    onClick={()=>{
                                        dispatch(appProfilePop({appProfilePop:true,appProfilePopTit:"거주지",appProfilePopEdit:true}));
                                    }}
                                ><span className="ellipsis">{address ? address : "선택"}</span></button>
                                <button type="button" className="btn_sel" 
                                    onClick={()=>{
                                        dispatch(appProfilePop({appProfilePop:true,appProfilePopTit:"거주지",appProfilePopEdit:true}));
                                    }}
                                ><span className="ellipsis">{address2 ? address2 : "선택"}</span></button>
                            </div>
                        </li>
                        <li>
                            <p className="input_tit">나의 키</p>
                            <button type="button" className="btn_sel" 
                                onClick={()=>{
                                    dispatch(appProfilePop({appProfilePop:true,appProfilePopTit:"키",appProfilePopEdit:true}));
                                }}
                            ><span className="ellipsis">{height ? height : "선택"}</span></button>
                        </li>
                        <li>
                            <p className="input_tit">나의 직업</p>
                            <button type="button" className="btn_sel" 
                                onClick={()=>{
                                    dispatch(appProfilePop({appProfilePop:true,appProfilePopTit:"직업",appProfilePopEdit:true}));
                                }}
                            ><span className="ellipsis">{myType.m_job ? myType.m_job : "선택"}</span></button>
                        </li>
                        <li>
                            <p className="input_tit">나의 외모 점수</p>
                            <button type="button" className="btn_sel" 
                                onClick={()=>{
                                    dispatch(appProfilePop({appProfilePop:true,appProfilePopTit:"외모 점수",appProfilePopEdit:true}));
                                }}
                            ><span className="ellipsis">{myType.m_visual ? myType.m_visual+"점" : "선택"}</span></button>
                        </li>
                        <li>
                            <p className="input_tit">나의 관심사</p>
                            <button type="button" className="btn_sel" 
                                onClick={()=>{
                                    dispatch(appProfilePop({appProfilePop:true,appProfilePopTit:"내 관심사",appProfilePopEdit:true}));
                                }}
                            ><span className="ellipsis">{myType.m_like && myType.m_like.length > 0 ? myType.m_like.join(", ") : "선택"}</span></button>
                        </li>
                        <li>
                            <p className="input_tit">나의 MBTI</p>
                            <button type="button" className="btn_sel" 
                                onClick={()=>{
                                    dispatch(appProfilePop({appProfilePop:true,appProfilePopTit:"MBTI",appProfilePopEdit:true}));
                                }}
                            ><span className="ellipsis">{myType.m_mbti ? myType.m_mbti : "선택"}</span></button>
                        </li>
                        <li>
                            <p className="input_tit">나의 타입</p>
                            <button type="button" className="btn_sel" 
                                onClick={()=>{
                                    dispatch(appProfilePop({appProfilePop:true,appProfilePopTit:"타입",appProfilePopEdit:true}));
                                }}
                            ><span className="ellipsis">{myType.m_character && myType.m_character.length > 0 ? myType.m_character.join(", ") : "선택"}</span></button>
                        </li>
                        <li>
                            <p className="input_tit">나는 흡연을</p>
                            <button type="button" className="btn_sel" 
                                onClick={()=>{
                                    dispatch(appProfilePop({appProfilePop:true,appProfilePopTit:"흡연 여부",appProfilePopEdit:true}));
                                }}
                            ><span className="ellipsis">{
                                myType.m_smok ?
                                    myType.m_smok == "1" ? "한다"
                                    :myType.m_smok == "2" ? "안 한다"
                                    :myType.m_smok == "3" && "가끔 한다"
                                : "선택"
                            }</span></button>
                        </li>
                        <li>
                            <p className="input_tit">나는 술을</p>
                            <button type="button" className="btn_sel" 
                                onClick={()=>{
                                    dispatch(appProfilePop({appProfilePop:true,appProfilePopTit:"음주 여부",appProfilePopEdit:true}));
                                }}
                                ><span className="ellipsis">{
                                    myType.m_drink ?
                                        myType.m_drink == "1" ? "한다"
                                        :myType.m_drink == "2" ? "가끔 한다"
                                        :myType.m_drink == "3" && "안 한다"
                                    : "선택"
                                }</span></button>
                        </li>
                        <li>
                            <p className="input_tit">나의 종교</p>
                            <button type="button" className="btn_sel" 
                                onClick={()=>{
                                    dispatch(appProfilePop({appProfilePop:true,appProfilePopTit:"종교",appProfilePopEdit:true}));
                                }}
                            ><span className="ellipsis">{myType.m_religion ? myType.m_religion : "선택"}</span></button>
                        </li>
                        <li>
                            <p className="input_tit">나의 선호하는 데이트</p>
                            <button type="button" className="btn_sel" 
                                onClick={()=>{
                                    dispatch(appProfilePop({appProfilePop:true,appProfilePopTit:"선호하는 데이트",appProfilePopEdit:true}));
                                }}
                            ><span className="ellipsis">{myType.m_date && myType.m_date.length > 0 ? myType.m_date.join(", ") : "선택"}</span></button>
                        </li>
                        <li>
                            <p className="input_tit">나의 가입경로</p>
                            <button type="button" className="btn_sel" 
                                onClick={()=>{
                                    dispatch(appProfilePop({appProfilePop:true,appProfilePopTit:"가입경로",appProfilePopEdit:true}));
                                }}
                            ><span className="ellipsis">{myType.m_motive ? myType.m_motive : "선택"}</span></button>
                        </li>
                    </ul>
                </div>
                <div className="line_box" id="box3">
                    <p className="top_tit">이상형 프로필</p>
                    <ul className="form_ul">
                        <li>
                            <p className="input_tit">상대방의 키</p>
                            <button type="button" className="btn_sel" 
                                onClick={()=>{
                                    dispatch(appProfilePop2({appProfilePop2:true,appProfilePopTit2:"키",appProfilePopEdit2:true}));
                                }}
                            ><span className="ellipsis">{height2 ? height2 : "선택"}</span></button>
                        </li>
                        <li>
                            <p className="input_tit">상대방의 직업</p>
                            <button type="button" className="btn_sel" 
                                onClick={()=>{
                                    dispatch(appProfilePop2({appProfilePop2:true,appProfilePopTit2:"직업",appProfilePopEdit2:true}));
                                }}
                            ><span className="ellipsis">{idealType.t_job ? idealType.t_job : "선택"}</span></button>
                        </li>
                        <li>
                            <p className="input_tit">상대방의 외모 점수</p>
                            <button type="button" className="btn_sel" 
                                onClick={()=>{
                                    dispatch(appProfilePop2({appProfilePop2:true,appProfilePopTit2:"외모 점수",appProfilePopEdit2:true}));
                                }}
                            ><span className="ellipsis">{idealType.t_visual ? idealType.t_visual+"점" : "선택"}</span></button>
                        </li>
                        <li>
                            <p className="input_tit">상대방의 MBTI</p>
                            <button type="button" className="btn_sel" 
                                onClick={()=>{
                                    dispatch(appProfilePop2({appProfilePop2:true,appProfilePopTit2:"MBTI",appProfilePopEdit2:true}));
                                }}
                            ><span className="ellipsis">{idealType.t_mbti ? idealType.t_mbti : "선택"}</span></button>
                        </li>
                        <li>
                            <p className="input_tit">상대방의 타입</p>
                            <button type="button" className="btn_sel" 
                                onClick={()=>{
                                    dispatch(appProfilePop2({appProfilePop2:true,appProfilePopTit2:"타입",appProfilePopEdit2:true}));
                                }}
                            ><span className="ellipsis">{idealType.t_character && idealType.t_character.length > 0 ? idealType.t_character.join(", ") : "선택"}</span></button>
                        </li>
                        <li>
                            <p className="input_tit">상대방은 흡연을</p>
                            <button type="button" className="btn_sel" 
                                onClick={()=>{
                                    dispatch(appProfilePop2({appProfilePop2:true,appProfilePopTit2:"흡연 여부",appProfilePopEdit2:true}));
                                }}
                            ><span className="ellipsis">{
                                idealType.t_smok ?
                                    idealType.t_smok == "1" ? "한다"
                                    :idealType.t_smok == "2" ? "안 한다"
                                    :idealType.t_smok == "3" && "가끔 한다"
                                : "선택"
                            }</span></button>
                        </li>
                        <li>
                            <p className="input_tit">상대방은 술을</p>
                            <button type="button" className="btn_sel" 
                                onClick={()=>{
                                    dispatch(appProfilePop2({appProfilePop2:true,appProfilePopTit2:"음주 여부",appProfilePopEdit2:true}));
                                }}
                                ><span className="ellipsis">{
                                    idealType.t_drink ?
                                        idealType.t_drink == "1" ? "한다"
                                        :idealType.t_drink == "2" ? "가끔 한다"
                                        :idealType.t_drink == "3" && "안 한다"
                                    : "선택"
                                }</span></button>
                        </li>
                        <li>
                            <p className="input_tit">상대방의 종교</p>
                            <button type="button" className="btn_sel" 
                                onClick={()=>{
                                    dispatch(appProfilePop2({appProfilePop2:true,appProfilePopTit2:"종교",appProfilePopEdit2:true}));
                                }}
                            ><span className="ellipsis">{idealType.t_religion ? idealType.t_religion : "선택"}</span></button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="btn_box">
                <button type="button" className="app_btn2">저장</button>
            </div>
        </div>

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}  
    </>);
};

export default EditProfile;