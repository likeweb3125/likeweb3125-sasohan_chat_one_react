import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Scrollbar, Navigation, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { headerMenuOn } from "../store/commonSlice";
import { managerPop, confirmPop, imgPop } from "../store/popupSlice";
import ManagerBox from "../components/component/ManagerBox";
import ConfirmPop from "../components/popup/ConfirmPop";
import { enum_api_uri } from "../config/enum";
import * as CF from "../config/function";
import util from "../config/util";
import m_visual_tag from "../images/main_visual_tag.svg";
import m_visual_img1 from "../images/main_visual_txt1.png";
import m_visual_img2 from "../images/main_visual_txt2.png";
import manager_img from "../images/sample/manager0.png";
import tip_box_img from "../images/tip_box.svg";
import tip_box_img_mo from "../images/tip_box_mo.svg";
import ic_badge from "../images/ic_badge.svg";
import about_bg1 from "../images/about_bg1.jpg";
import about_bg2 from "../images/about_bg2.jpg";
import about_bg3 from "../images/about_bg3.jpg";
import about_bg4 from "../images/about_bg4.jpg";
import about_bg5 from "../images/about_bg5.jpg";
import about_bg6 from "../images/about_bg6.jpg";
import about_bg1_tab from "../images/about_bg1_tab.jpg";
import about_bg2_tab from "../images/about_bg2_tab.jpg";
import about_bg3_tab from "../images/about_bg3_tab.jpg";
import about_bg4_tab from "../images/about_bg4_tab.jpg";
import about_bg5_tab from "../images/about_bg5_tab.jpg";
import about_bg6_tab from "../images/about_bg6_tab.jpg";
import about_img1 from "../images/about_img1.svg";
import about_img2 from "../images/about_img2.svg";
import about_img3 from "../images/about_img3.svg";
import about_img3_mo from "../images/about_img3_mo.svg";
import about_img4 from "../images/about_img4.svg";
import about_img5 from "../images/about_img5.svg";
import about_img6 from "../images/about_img6.svg";
import blog_img1 from "../images/blog_img1.jpg";
import blog_img2 from "../images/blog_img2.jpg";
import blog_img3 from "../images/blog_img3.jpg";
import blog_img4 from "../images/blog_img4.jpg";
import award_img1 from "../images/award_img1.svg";
import award_img1_pop from "../images/award_img1_pop.png";
import trust_img1 from "../images/trust_img1.svg";
import trust_img2 from "../images/trust_img2.svg";
import trust_img1_pop from "../images/trust_img1_pop.jpg";
import trust_img2_pop from "../images/trust_img2_pop.png";
import trust_img3_pop from "../images/trust_img3_pop.jpg";
import dona_img1 from "../images/dona_img1.jpg";
import dona_img2 from "../images/dona_img2.jpg";
import dona_img3 from "../images/dona_img3.jpg";
import none_img from "../images/none_img.jpg";

SwiperCore.use([Pagination,Scrollbar,Navigation,EffectFade]);

const Main = () => {
    const dispatch = useDispatch();
    const popup = useSelector((state)=>state.popup);
    const [confirm, setConfirm] = useState(false);
    const sect1Ref = useRef(null);
    const sect2Ref = useRef(null);
    const sect3Ref = useRef(null);
    const sect4Ref = useRef(null);
    const sect5Ref = useRef(null);
    const sect6Ref = useRef(null);
    const [sect1On, setSect1On] = useState(false);
    const [sect2On, setSect2On] = useState(false);
    const [sect3On, setSect3On] = useState(false);
    const [sect4On, setSect4On] = useState(false);
    const [sect5On, setSect5On] = useState(false);
    const [sect6On, setSect6On] = useState(false);
    const [managerSwiperActive, setManagerSwiperActive] = useState(false);
    const aboutBgImg = [about_bg1, about_bg2, about_bg3, about_bg4, about_bg5, about_bg6];
    const aboutBgImgTab = [about_bg1_tab, about_bg2_tab, about_bg3_tab, about_bg4_tab, about_bg5_tab, about_bg6_tab];
    const aboutTabList = ["원조","소개팅 룰","비교","금액","프로그램","환불"];
    const [aboutTab, setAboutTab] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [blogSwiperActive, setBlogSwiperActive] = useState(false);
    const [blogOn, setBlogOn] = useState(0);
    const [trustTab,setTrustTab] = useState(0);
    const m_list = enum_api_uri.m_list;
    const blog_list = enum_api_uri.blog_list;
    const ytb_list = enum_api_uri.ytb_list;
    const review_list = enum_api_uri.review_list;
    const user_count = enum_api_uri.user_count;
    const [managerList, setManagerList] = useState([]);
    const [blogList, setBlogList] = useState([]);
    const [ytbList, setYtbList] = useState([]);
    const [ytbOn, setYtbOn] = useState(0);
    const [reviewList, setReviewList] = useState([]);
    const [count, setCount] = useState(0);
    const charmingSliderRef = useRef();
    const ref_browser = util.getCookie("ref_browser");


    // Confirm팝업 닫힐때
    useEffect(()=>{
        if(popup.confirmPop === false){
            setConfirm(false);
        }
    },[popup.confirmPop]);

    //화면사이즈 변경될때 width 체크---------
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    },[]);

    useEffect(() => {
        setManagerSwiperActive(windowWidth < 768);
        setBlogSwiperActive(windowWidth < 1200);
    }, [windowWidth]);


    //스크롤시 헤더메뉴 on
    const scrollHeaderOn = () => {
        const scroll = window.scrollY;
        const sect1 = sect1Ref.current.offsetTop;
        const sect2 = sect2Ref.current.offsetTop;
        const sect3 = sect3Ref.current.offsetTop;
        const sect5 = sect5Ref.current.offsetTop;
        const sect6 = sect6Ref.current.offsetTop;
        if(scroll >= sect1 && scroll < sect2){
            dispatch(headerMenuOn(1));
        }
        if(scroll >= sect2 && scroll < sect3){
            dispatch(headerMenuOn(2));
        }
        if(scroll >= sect3 && scroll < sect5){
            dispatch(headerMenuOn(3));
        }
        if(scroll >= sect5 && scroll < sect6){
            dispatch(headerMenuOn(4));
        }
        if(scroll >= sect6){
            dispatch(headerMenuOn(5));
        }
        if(scroll < sect1){
            dispatch(headerMenuOn(null));
        }
    };

    //스크롤시 section on
    const scrollSectOn = () => {
        const scroll = window.scrollY;
        const sections = [
            { ref: sect1Ref, onSet: setSect1On },
            { ref: sect2Ref, onSet: setSect2On },
            { ref: sect3Ref, onSet: setSect3On },
            { ref: sect4Ref, onSet: setSect4On },
            { ref: sect5Ref, onSet: setSect5On },
            { ref: sect6Ref, onSet: setSect6On }
        ];
      
        sections.forEach(({ ref, onSet }) => {
            const offsetTop = ref.current.offsetTop;
            if (scroll >= offsetTop - 500) {
                onSet(true);
            }
        });
    };

    useEffect(() => {    
        window.addEventListener("scroll", scrollHeaderOn);
        window.addEventListener("scroll", scrollSectOn);

        return () => {
            window.removeEventListener("scroll", scrollHeaderOn);
            window.removeEventListener("scroll", scrollSectOn);
        };
    }, []);


    //매니저리스트 가져오기
    const getManagerList = () => {
        axios.get(`${m_list}`)
        .then((res)=>{
            if(res.status === 200){
                let data = res.data;
                setManagerList(data);
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
        });
    };


    //블로그리스트 가져오기
    const getBlogList = () => {
        axios.get(`${blog_list}`)
        .then((res)=>{
            if(res.status === 200){
                let data = res.data;
                setBlogList([...data]);
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
        });
    };


    //유튜브리스트 가져오기
    const getYtbList = () => {
        axios.get(`${ytb_list}`)
        .then((res)=>{
            if(res.status === 200){
                let data = res.data;
                setYtbList([...data]);
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
        });
    };


    //후기리스트 가져오기
    const getReviewList = () => {
        axios.get(`${review_list}`)
        .then((res)=>{
            if(res.status === 200){
                let data = res.data;
                setReviewList([...data]);
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
        });
    };


    //사용자 수 가져오기
    const getCount = () => {
        axios.get(`${user_count}`)
        .then((res)=>{
            if(res.status === 200){
                let data = res.data;
                setCount(data.user_cnt);
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
        });
    };


    useEffect(()=>{
        getManagerList();
        getBlogList();
        getYtbList();
        getReviewList();
        getCount();
    },[]);


    //모바일 매니저슬라이드 더보기버튼 클릭시 슬라이드
    const slideMoreHandler = () => {
        charmingSliderRef.current.swiper.slideNext();
    };


    //앱일때 링크이동 클릭시 
    const appLinkHandler = (url,site) => {
        if(ref_browser == "app"){
            const data = {
                url: url,
                site: site
            }
            window.outlink.postMessage(JSON.stringify(data));
        }
    };


    return(<>
        <div className="main_visual_wrap">
            <div className="main_visual flex_center">
                <div className="tag_img">
                    <img src={m_visual_tag} alt="띠이미지" />
                </div>
                <div className="visual_txt">
                    <img src={m_visual_img1} alt="메인이미지" className="img1" />
                    <img src={m_visual_img2} alt="메인이미지" className="img2" />
                </div>
                <div className="scroll">
                    <strong>Scroll</strong>
                </div>
            </div>
        </div>

        
        <section className={`section section1 ${sect1On ? "on" : ""}`} id="sect1" ref={sect1Ref}>
            {managerList.length > 0 &&
            <div className="section_inner">
                <div className="title_box">
                    <p className="tit"><strong>매니저와 함께 </strong><br/>새로운 <br className="mo_show"/>인연을 만들어 보세요!</p>
                    <div className="tip_box tm16">
                        <p className="tip_txt">매니저가 뭔가요?</p>
                        <div className="box">
                            <img src={tip_box_img} alt="말풍선이미지" className="mo_none" />
                            <img src={tip_box_img_mo} alt="말풍선이미지" className="mo_show" />
                        </div>
                    </div>
                </div>

                <div className="manager_wrap">
                    <Swiper 
                        className="charming_slider"
                        slidesPerView={1}
                        spaceBetween={30}
                        observer={true}
                        observeParents={true}
                        navigation={{nextEl: ".manager_wrap .swiper-button-next.manager_btn",prevEl: ".manager_wrap .swiper-button-prev.manager_btn"}}
                        loop={true}
                        pagination={{
                            el: ".manager_wrap .swiper-pagination.manager_pagin",
                            type: 'fraction',
                            formatFractionCurrent: function (number) {
                                return number;
                            },
                            formatFractionTotal: function (number) {
                                return number;
                            },
                            renderFraction: function (currentClass, totalClass) {
                                return '<span class="' + currentClass + '"></span>' +
                                       ' / ' +
                                       '<span class="' + totalClass + '"></span>';
                            }
                        }}
                        ref={charmingSliderRef}
                    >
                        {managerList.map((data,i)=>{
                            return(
                                <SwiperSlide key={i}>
                                    <div className="inner_box flex_bottom flex_between">
                                        <div className="charming" onClick={()=>{dispatch(managerPop({managerPop:true,managerPopData:data}))}}>
                                        {/* <div className="charming"> */}
                                            <div className="img">
                                                <img src={data.photo ? data.photo : none_img} alt="매니저프로필이미지" />
                                            </div>
                                            <div className="txt_box">
                                                <div className="name flex_wrap">
                                                    <strong>{data.manager_name}</strong>
                                                    <span>{data.manager_type_txt}</span>
                                                </div> 
                                                <p className="ellipsis2">{data.txt}</p>
                                            </div>
                                            <div className="badge">
                                                <img src={ic_badge} alt="배지이미지" />
                                            </div>
                                        </div>
                                        {data.matching_manager.length > 0 &&
                                            <Swiper 
                                                className={`manager_slider manager_slider_${i+1}`}
                                                slidesPerView={2.3}
                                                spaceBetween={8}
                                                observer={true}
                                                observeParents={true}
                                                navigation={{nextEl: `.manager_slider_${i+1} .swiper-button-next`,prevEl: `.manager_slider_${i+1} .swiper-button-prev`}}
                                                scrollbar={{draggable: true}}
                                                breakpoints={
                                                    {
                                                        1420:{slidesPerView:4,spaceBetween:24},//width >= 1420
                                                        768:{slidesPerView:2,spaceBetween:8},//width >= 768
                                                    }
                                                }
                                            >
                                                {data.matching_manager.map((data,i)=>{
                                                    return(
                                                        <SwiperSlide key={i} onClick={()=>{dispatch(managerPop({managerPop:true,managerPopData:data}))}}>
                                                            <ManagerBox data={data}/>
                                                        </SwiperSlide>
                                                    );
                                                })}
                                                <div className="swiper-button-prev"></div>
                                                <div className="swiper-button-next"></div>
                                            </Swiper>
                                        }
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                        
                    </Swiper>
                    <div className="btn_box flex_between">
                        <div className="swiper-button-prev hover_btn manager_btn"></div>
                        <div className="swiper-pagination manager_pagin"></div>
                        <div className="swiper-button-next hover_btn manager_btn"></div>
                        <button type="button" className="more_btn" onClick={slideMoreHandler}></button>
                    </div>
                </div>
            </div>
            }
        </section>

        <section className={`section section2 ${sect2On ? "on" : ""}`} id="sect2" ref={sect2Ref}>
            <div className="about_wrap flex">
                <div className="bg_box">
                    <ul>
                        {aboutTabList.map((txt, i) => {
                            const imagePath = aboutBgImg[i];
                            const imagePathTab = aboutBgImgTab[i];
                            return (
                            <li key={i} className={aboutTab === i ? "on" : ""}>
                                <img src={imagePath} alt="배경이미지" className="pc_img" />
                                <img src={imagePathTab} alt="배경이미지" className="tab_img" />
                            </li>
                            );
                        })}
                    </ul>
                    <p className="txt">사소한에 대해 <br/>알려드릴게요!</p>
                </div>
                <div className="txt_box">
                    <ul className="tab_ul">
                        {aboutTabList.map((txt,i)=>{
                            return(
                                <li key={i} className={aboutTab === i ? "on" : ""}  onClick={()=>{setAboutTab(i)}}><strong>0{i+1}</strong>{txt}</li>
                            );
                        })}
                    </ul>
                    <ul className="txt_ul">
                        <li className={aboutTab === 0 ? "on" : ""}>
                            <h4>매니저를 통한 온라인 소개팅의 원조</h4>
                            <p className="txt"><strong>{"<국내 최초 사람이 해주는 매니저 소개> <카카오톡 신개념 소개팅>"}</strong> 등 <br/>
                            사소한이 매니저를 통한 온라인 소개팅의 원조라는 사실을 알고 계셨나요?</p>
                            <p className="txt2">최근 몇 년 사이 <br/>
                            사소한의 인기에 힘입어 매니저 소개팅을 내세우며 유사한 서비스를 출시하는 회사들이 많이 생겼습니다. <br/>
                            그러나 이러한 개념의 서비스가 <span>처음 도입된 것은 사소한</span>이었습니다. <br/><br/>

                            사소한 소개팅은 2015년 4월 출시 이래로 이미 <span>9년의 역사</span>를 가지고 있으며, <br/>
                            <span>매니저를 통한 온라인 소개팅 서비스를 선보인 최초의 회사</span>입니다. <br/>
                            비슷한 개념의 다른 소개팅 업체를 찾아 보아도, 저희 회사가 압도적으로 오래된 것은 부인할 수 없는 사실입니다. <br/>
                            추가로, 사소한을 모방한 회사들 중 70% 이상은 사소한의 전직원 출신으로 구성됐음을 알려드립니다. <br/>
                            직원 출신 회사의 직원이 또 모방하여 차린 회사도 있습니다. <br/>
                            하지만 모방은 혁신적인 면에서 결코 창조를 이길 수 없습니다. <br/><br/>

                            결국 사소한은 뿌리이자 다른 아류 서비스들과는 다르게 <br/>
                            오랜 기간 동안 수많은 회원들의 신뢰와 성원을 받으며 쌓인 노하우를 기반으로 <br/>
                            <span>근본적이며 보다 안전한 서비스를 제공</span>하고 있습니다. <br/>
                            이용해보신다면 차별화된 서비스의 가치를 직접 경험하실 수 있을 것입니다. <br/><br/>

                            <span>이러한 자부심을 이야기 할 수 있는 건 오직 사소한 하나뿐입니다.</span></p>
                        </li>
                        <li className={aboutTab === 1 ? "on" : ""}>
                            <h4>사소한 스파크 매칭 시스템</h4>
                            <img src={about_img1} alt="일러스트이미지" />
                            <p className="txt">사소한 스파크 매칭 시스템은 회원님의 결제 내역을 기반으로 여러 매니저가 적합한 상대를 찾아주는 <br/>
                            <strong>혁신적인 소개팅 서비스</strong>입니다.</p>
                            <p className="txt2">회원님이 결제를 완료하면 사소한 매니저들에게 회원님의 <span>'사소한 스파크'가 바로 활성화</span>됩니다. <br/>
                            이를 통해 여러 매니저들이 동시에 회원님에게 연락을 시작하며, <br/>
                            한 명의 매니저만이 제공해 주었던 제한적인 선택지를 넘어 더욱 다양한 상대를 찾을 수 있게 됩니다. <br/><br/>

                            '사소한 스파크' 는 활성 즉시 여러 명의 매니저들이 각기 다른 관점과 기준으로 소개팅 상대를 추천해주기 때문에, <br/>
                            회원님에게 <span>풍부한 이상형풀을 경험할 수 있도록</span> 도와줍니다. <br/>

                            이를 통해 회원님의 소개팅 성공률은 크게 향상되며, <br/><br/>
                            <span>원하는 조건과 취향에 가장 부합하는 상대를 찾을 수 있게 됩니다.</span><br/>

                            다른 소개팅에서 경험할 수 없는 이 독특한 서비스로 회원님들은 <br/>
                            소중한 시간을 아끼고 이상형에 가까운 분을 더 빠르고 <br/>
                            정확하게 만날 수 있습니다.</p>
                        </li>
                        <li className={aboutTab === 2 ? "on" : ""}>
                            <h4>사소한이어야 하는 이유</h4>
                            <img src={about_img3} alt="일러스트이미지" className="mo_none" />
                            <img src={about_img3_mo} alt="일러스트이미지" className="mo_show" />
                        </li>
                        <li className={aboutTab === 3 ? "on" : ""}>
                            <h4>매너베이트 시스템</h4>
                            <img src={about_img4} alt="일러스트이미지" />
                            <p className="txt">사소한 소개팅 서비스는 <strong>소개팅 진행시</strong> 비용을 한 쪽에서만 부담을 하는 <strong>단방향 결제 소개팅 시스템</strong>입니다.</p>
                            <p className="txt2">이 과정에서,사소한은 소개팅을 유료로 진행한 결제자님에게 소개팅 비용 8만 8천 원을 받고, <br/>
                            상대 이성에게 1만 원을 따로 빼서 전달하게 됩니다. <br/>
                            이 1만원을 <span>매너베이트</span>라고 부르며, 매너베이트는 <span>manner(예의) + bait(미끼) 의 합성어</span> 입니다. <br/><br/>

                            매너는 '태도와 예의'를 뜻하는 단어로, 상대 이성이 소개팅에 진지한 자세와 태도로 임함을 뜻하며, <br/>
                            베이트는 '미끼' 라는 뜻으로, <span>유료 결제자님의 상대 이성을 유도하여 소개팅 테이블로 모셔오는 역할</span>을 합니다. <br/><br/>

                            즉 <span>매너베이트</span>는 소개팅 파트너를 진지한 태도로 소개팅에 참여하게 하고 책임감을 부여하며, <br/>
                            파트너를 유연하게 소개팅에 참여할 수 있도록 유도하는 보상입니다. <br/><br/>

                            사소한은 매너베이트를 활용하여 유료 결제자님에게 <span>확실한 이상형 선택의 기회를 제공</span>합니다. <br/>
                            매너 베이트 시스템은 사소한 만이 진행하는 독창적인 시스템입니다. <br/><br/>

                            비록 소개팅 비용에 있어서는 유료결제와, 매너베이트 사이의 비평등함이 존재하지만, <br/>
                            오히려 놀랍게도 이를 통해 더 많은 이상형을 <br/>
                            <span>매칭 받을 수 있는 기회의 평등함이 제공됩니다. </span><br/><br/>

                            따라서 매너베이트 시스템을 이용한 소개팅은 소개팅 경험에 대한 <br/>
                            만족도가 높아질 것이며 더 적합한 이상형과 만날 수 있는 가능성도 높아집니다.</p>
                        </li>
                        <li className={aboutTab === 4 ? "on" : ""}>
                            <h4>4박 5일 로맨스 프로그램</h4>
                            <img src={about_img5} alt="일러스트이미지" />
                            <p className="txt">사소한 소개팅은 오프라인 소개팅 서비스와는 달리, <strong>온라인 소개팅 서비스</strong>입니다.</p>
                            <p className="txt2">사소한 소개팅 룰은 <span>4박5일 로맨스 프로그램</span>으로 <br/>
                            두 사람이 4박 5일간 서로를 알아가고, 서로에 대한 호감이 깊어지는 설레임을 경험할 수 있는 프로그램입니다. <br/><br/>

                            매칭이 되면 당신이 지목한 이성과, 당신을 위한 소개팅 테이블(채팅방)을 만들어드립니다. <br/>
                            그리고 4박 5일 동안 서로를 더 알아가는 과정을 통해 참가자들은 보다 깊은 이해와 신뢰를 쌓아 갑니다. <br/><br/>

                            또한, 4박 5일 로맨스 룰은 특별하게 상대방과 최소 한 번 이상의 통화를 필수적으로 보장하는 <span>통화 필수 보장 서비스</span>를 <br/>
                            제공함으로써 소개팅 상대방과의 전화 통화를 중요한 원칙으로 지키고 있습니다. <br/><br/>

                            그 후 <span>결정의 날</span>이 찾아오게 되면 당신은 상대방과의 운명을 확인할 수 있습니다. <br/>
                            만약 두 사람 중 한 명이 만나지 않기로 결정하면 소개팅은 실패로 끝나 종료되지만, <br/>
                            두 사람 모두 만남을 선택한다면 이제부터는 당신의 로맨스가 시작됩니다!</p>
                        </li>
                        <li className={aboutTab === 5 ? "on" : ""}>
                            <h4>스마트 환불 시스템</h4>
                            <img src={about_img6} alt="일러스트이미지" />
                            <p className="txt"><strong>우리는 고객님의 만족을 최우선으로 생각합니다.</strong></p>
                            <p className="txt2">만약 불만족스러운 상황이 발생할 경우, 저희는 고객님께서 결제한 금액 중 일부를 빠르고 간편하게 환불해드립니다. <br/>
                            이는 사소한 소개팅이 자랑하는 스마트 환불 시스템이며 소개팅 서비스는 인간의 감정과 마음이 언제든 변할 수 있다는 <br/>
                            특성을 고려하여 유연한 체계를 갖추어야 한다고 생각합니다. <br/>
                            하여서, 고객님의 단순 변심일지언정 <span>고객님이 원할 때 언제든지 환불이 가능</span>합니다. <br/><br/>

                            <span>스마트 환불 시스템의 체계는 아래와 같습니다. <br/>
                            결제 당일 환불 : 80% <br/>
                            소개팅 2일차 : 60% <br/>
                            소개팅 3일차 : 40% <br/>
                            소개팅 4일차 : 20% <br/>
                            결정의 날 : 환불 불가 </span><br/><br/>

                            소개팅 서비스는 안심하고 이용할 수 있는 서비스입니다. <br/>
                            고객님의 만족을 위해 최선을 다하는 저희와 함께 <br/>
                            안정적이고 만족스러운 소개팅 경험을 누려보세요.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        
        <section className={`section section3 ${sect3On ? "on" : ""}`} id="sect3" ref={sect3Ref}>
            {blogList.length > 0 &&
            <div className="section_inner">
                <div className="title_box flex_between flex_bottom">
                    <p className="tit">사소한의 <br/><strong>새로운 소식이에요.</strong></p>
                    <a className="btn_link" href="https://blog.naver.com/sasohan_official" target="_blank" rel="noopener noreferrer">사소한 블로그 바로가기</a>
                </div>
                <div className="blog_wrap">
                    {blogSwiperActive ? 
                        <Swiper 
                            className="blog_slider"
                            slidesPerView={1.3}
                            spaceBetween={28}
                            pagination={{ el: ".blog_slider .swiper-pagination", clickable: true }}
                            loop={true}
                            loopedSlides={2}
                            speed={400}
                            centeredSlides={true}
                            observer={true}
                            observeParents={true}
                            breakpoints={
                                //width >= 767
                                {767:{slidesPerView:1.3,spaceBetween:34}}
                            }
                        >
                            {blogList.map((data,i)=>{
                                return(
                                    <SwiperSlide className="slide_box" key={i}>
                                        <a href={data.link} target="_blank" rel="noopener noreferrer"
                                            onClick={()=>{appLinkHandler(data.link,"naver")}}
                                        >
                                            <img src={data.image} alt="배경이미지" />
                                            <div className="txt_box">
                                                <div>
                                                    <h5 className="ellipsis2">{data.subject}</h5>
                                                    <p className="date">{data.w_date}</p>
                                                </div>
                                                <p className="txt ellipsis4">{data.contents}</p>
                                            </div>
                                        </a>
                                    </SwiperSlide>
                                );
                            })}
                            <div className="swiper-pagination"></div>
                        </Swiper>
                        : 
                        <ul className="blog_ul flex">
                            {blogList.map((data,i)=>{
                                return(
                                    <li 
                                        className={`slide_box ${blogOn === i ? "on" : ""}`} 
                                        onClick={()=>{setBlogOn(i)}} 
                                        key={i}
                                    >
                                        <a href={data.link} target="_blank" rel="noopener noreferrer"
                                            onClick={()=>{appLinkHandler(data.link,"naver")}}
                                        >
                                            <img src={data.image} alt="배경이미지" />
                                            <div className="txt_box">
                                                <p className="tit ellipsis2">{data.subject}</p>
                                                <div>
                                                    <h5 className="ellipsis2">{data.subject}</h5>
                                                    <p className="date">{data.w_date}</p>
                                                </div>
                                                <p className="txt ellipsis4">{data.contents}</p>
                                            </div>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    }
                </div>
            </div>
            }
        </section>

        
        <section className={`section section4 ${sect4On ? "on" : ""}`} ref={sect4Ref}>
            {ytbList.length > 0 &&
            <div className="section_inner">
                <div className="youtube_wrap">
                    <div className="top_box flex_between flex_top">
                        <div className="title_box">
                            <p className="tit">오직, <br/><strong>사소한에서만.</strong></p>
                            <div className="flex_between">
                                <a className="btn_link ytb" href="https://www.youtube.com/@user-sasohan" target="_blank" rel="noopener noreferrer"
                                    onClick={()=>{appLinkHandler("https://www.youtube.com/@user-sasohan","youtube")}}
                                >유튜브 채널 바로가기</a>
                                {ytbList.length > 1 &&
                                <div className="btn_box flex">
                                    <div className="swiper-button-prev hover_btn"></div>
                                    <div className="swiper-button-next hover_btn"></div>
                                </div>
                                }
                            </div>
                        </div>
                        <div className="video_box">
                            <a
                                className="btn_play"
                                href={ytbList[ytbOn].link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={ytbList[ytbOn].image} alt="유튜브이미지" />
                                <div className="play"></div>
                            </a>
                        </div>
                    </div>
                    {ytbList.length > 1 &&
                    <Swiper 
                        className="youtube_slider"
                        slidesPerView={"auto"}
                        spaceBetween={8}
                        navigation={{nextEl: ".youtube_wrap .swiper-button-next",prevEl: ".youtube_wrap .swiper-button-prev"}}
                        scrollbar={{draggable: true}}
                        slideToClickedSlide={true}
                        breakpoints={
                            {
                                1200:{slidesPerView:4,spaceBetween:30}, //width >= 1200
                                767:{slidesPerView:4,spaceBetween:7},  //width >= 767
                            }
                        }
                    >
                        {ytbList.map((data,i)=>{
                            return(
                                <SwiperSlide key={i} onClick={()=>{setYtbOn(i)}}>
                                    <div className="img_box"><img src={data.image} alt="유튜브이미지" /></div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                    }
                </div>
            </div>
            }
        </section>

        <section className={`section section5 ${sect5On ? "on" : ""}`} id="sect5" ref={sect5Ref}>
            <div className="section_inner">
                <div className="donation_wrap">
                    <div className="title_box">
                        <p className="tit">회원님들을 위한 <br/><strong>사소한의 신뢰</strong></p>
                    </div>
                    <div className="inner_cont flex_between flex_bottom">
                        <div className="trust_cont">
                            <div className="tit_box flex_between">
                                <h5>사소한의 신뢰</h5>
                                <ul className="tab_ul flex">
                                    <li className={trustTab === 0 ? "on" : ""} onClick={()=>{setTrustTab(0)}}>외부평가</li>
                                    <li className={trustTab === 1 ? "on" : ""} onClick={()=>{setTrustTab(1)}}>인허가서류</li>
                                </ul>
                            </div>
                            <div className={`slider_box trust_slider_box ${trustTab === 0 ? "on" : ""}`}>
                                <Swiper
                                    className="trust_slider"
                                    slidesPerView={2}
                                    spaceBetween={12}
                                    observer={true}
                                    observeParents={true}
                                    navigation={{nextEl: ".trust_slider_box .swiper-button-next",prevEl: ".trust_slider_box .swiper-button-prev"}}
                                >
                                    <SwiperSlide onClick={()=>{dispatch(imgPop({imgPop:true,imgPopSrc:award_img1_pop}))}}>
                                        <div className="flex">
                                            <div className="img_box">
                                                <img src={award_img1} alt="이미지" />
                                            </div>
                                            <div className="txt_box">
                                                <p className="txt">2023 한국소비자 베스트브랜드대상 1위</p>
                                                <p className="date">고객만족 소개팅서비스업 <br/>2023.01.10</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                                <div className="swiper-button-prev"></div>
                                <div className="swiper-button-next"></div>
                            </div>
                            <div className={`slider_box trust_slider_box2 ${trustTab === 1 ? "on" : ""}`}>
                                <Swiper
                                    className="trust_slider2"
                                    slidesPerView={2}
                                    spaceBetween={12}
                                    observer={true}
                                    observeParents={true}
                                    navigation={{nextEl: ".trust_slider_box2 .swiper-button-next",prevEl: ".trust_slider_box2 .swiper-button-prev"}}
                                >
                                    <SwiperSlide onClick={()=>{dispatch(imgPop({imgPop:true,imgPopSrc:trust_img3_pop}))}}>
                                        <div className="flex flex_bottom">
                                            <div className="img_box">
                                                <img src={trust_img1} alt="이미지" />
                                            </div>
                                            <div className="txt_box">
                                                <p className="txt">상표등록증</p>
                                                <p className="date">2023.05.18</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide onClick={()=>{dispatch(imgPop({imgPop:true,imgPopSrc:trust_img1_pop}))}}>
                                        <div className="flex flex_bottom">
                                            <div className="img_box">
                                                <img src={trust_img1} alt="이미지" />
                                            </div>
                                            <div className="txt_box">
                                                <p className="txt">사업자등록증</p>
                                                <p className="date">2015.04.28</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide onClick={()=>{dispatch(imgPop({imgPop:true,imgPopSrc:trust_img2_pop}))}}>
                                        <div className="flex flex_bottom">
                                            <div className="img_box">
                                                <img src={trust_img2} alt="이미지" />
                                            </div>
                                            <div className="txt_box">
                                                <p className="txt">통신판매업</p>
                                                <p className="date">2017.04.18</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                                <div className="swiper-button-prev"></div>
                                <div className="swiper-button-next"></div>
                            </div>
                        </div>
                        <div className="dona_cont">
                            <h5>정기적인 기부</h5>
                            <Swiper
                                className="dona_slider"
                                slidesPerView={1}
                                navigation={{nextEl: ".dona_slider .swiper-button-next",prevEl: ".dona_slider .swiper-button-prev"}}
                                pagination={{el: ".dona_slider .swiper-pagination",type: "fraction"}}
                                effect="fade"
                                fadeEffect={{crossFade: true}}
                            >
                                <SwiperSlide className="flex_between flex_top">
                                    <div className="img_box" onClick={()=>{dispatch(imgPop({imgPop:true,imgPopSrc:dona_img1}))}}>
                                        <img src={dona_img1} alt="이미지" />
                                    </div>
                                    <div className="txt_box">
                                        <p className="txt">밀알복지재단 후원</p>
                                        <p className="ellipsis4 mo_none">사소한은 정기적인 기부를 진행하고 있습니다.</p>
                                        {/* <p className="date">2023.05.31</p> */}
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="flex_between flex_top">
                                    <div className="img_box" onClick={()=>{dispatch(imgPop({imgPop:true,imgPopSrc:dona_img2}))}}>
                                        <img src={dona_img2} alt="이미지" />
                                    </div>
                                    <div className="txt_box">
                                        <p className="txt">Save the Children</p>
                                        <p className="ellipsis4 mo_none">사소한은 정기적인 기부를 진행하고 있습니다.</p>
                                        {/* <p className="date">2023.05.31</p> */}
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="flex_between flex_top">
                                    <div className="img_box" onClick={()=>{dispatch(imgPop({imgPop:true,imgPopSrc:dona_img3}))}}>
                                        <img src={dona_img3} alt="이미지" />
                                    </div>
                                    <div className="txt_box">
                                        <p className="txt">World Vision</p>
                                        <p className="ellipsis4 mo_none">사소한은 정기적인 기부를 진행하고 있습니다.</p>
                                        {/* <p className="date">2023.05.31</p> */}
                                    </div>
                                </SwiperSlide>
                                <div className="btn_box">
                                    <div className="swiper-pagination"></div>
                                    <div className="swiper-button-prev"></div>
                                    <div className="swiper-button-next"></div>
                                </div>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        <section className={`section section6 ${sect6On ? "on" : ""} ${reviewList.length > 0 ? "" : "none"}`} id="sect6" ref={sect6Ref}>
            {reviewList.length > 0 &&
            <div className="section_inner">
                <div className="review_wrap flex_between flex_top">
                    <div className="tit_cont">
                        <div className="title_box">
                            <p className="tit"><strong>사소한의 후기가 </strong><br/>증명합니다.</p>
                        </div>
                        <div className="btn_box flex mo_none">
                            <div className="swiper-button-prev hover_btn"></div>
                            <div className="swiper-button-next hover_btn"></div>
                        </div>
                    </div>
                    <Swiper
                        className="review_slider"
                        slidesPerView="auto"
                        slidesPerGroup={1}
                        navigation={{nextEl: ".review_wrap .swiper-button-next",prevEl: ".review_wrap .swiper-button-prev"}}
                        scrollbar={{draggable: true}}
                        breakpoints={
                            //width >= 1420
                            {1420:{slidesPerView:3,slidesPerGroup:3}}
                        }
                    >
                        {reviewList.map((data,i)=>{
                            return(
                                <SwiperSlide key={i}
                                    onClick={()=>{
                                        appLinkHandler(data.link,"insta");
                                        window.open(data.link);
                                    }} 
                                >
                                    <div className="img_box">
                                        <img src={data.thumb ? data.thumb : none_img} alt="이미지" />
                                    </div>
                                    {/* <div className="txt_box">
                                        <p className="txt ellipsis">{data.subject}</p>
                                        <p className="date">{data.w_date}</p>
                                    </div> */}
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
            }
        </section>

        <div className="app_wrap">
            <div className="section_inner flex_between">
                <p className="txt">지금 사소한을 이용하면, <br/><strong>{CF.MakeIntComma(count)}명의 사람</strong><span>을 만날 수 있어요.</span></p>
                <div className="app_box">
                    <ul className="flex">
                        <li>
                            <a
                                href="/"
                                // target="_blank"
                                rel="noopener noreferrer"
                            >Google Play
                            </a>
                        </li>
                        <li>
                            <a
                                href="/"
                                // target="_blank"
                                rel="noopener noreferrer"
                            >App Store
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        {/* confirm팝업 */}
        {confirm && <ConfirmPop />}
    </>);
};

export default Main;