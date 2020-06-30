import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import {
    DashboardOutlined,
    BarChartOutlined,
    BankOutlined,
    SendOutlined,
    RedditOutlined
} from '@ant-design/icons'
const { SubMenu,Item } = Menu

const PageKeyMapper = {
    "/dashboard":{key:"1",title:"概览 | Abstergo"},
    "/city/minprice":{key:"2",title:"城市间航班信息 | Abstergo"},
    "/city/avgprice":{key:"3",title:"城市平均机票价格 | Abstergo"},
    "/city/linenum":{key:"4",title:"城市航班数 | Abstergo"},
    "/flight/avgprice":{key:"5",title:"平均机票价格 | Abstergo"},
    "/flight/plane":{key:"6",title:"航班飞机偏好 | Abstergo"},
    "/flight/linenum":{key:"7",title:"各大航空公司航班数 | Abstergo"},
    "/corona/price":{key:"8",title:"机票价格变化 | Abstergo"},
    "/corona/linenum":{key:"9",title:"感染人数与航班数 | Abstergo"},
    "/trivial":{key:"10",title:"你知道吗？ | Abstergo"}
}

// 页表menu组件
const PageMenu = () => {
    const location = useLocation()
    const [selectKey, setSelectKey] = useState(["5"])
    useEffect(() => {
        console.log(location.pathname)
        const currPath = location.pathname
        if(PageKeyMapper[currPath]){
            const Pathkey = PageKeyMapper[currPath]
            setSelectKey([Pathkey.key])
            document.title = Pathkey.title
        }else{
            // 路由错误
            setSelectKey("0")
            document.title = "内容不存在 | Abstergo "
        }
        // setSelectKey([location.pathname])
        // 仅在地址发生变化的时候执行该段代码
    }, [location])
    console.log(selectKey)
    return (
        <Menu theme="light"
            selectedKeys={selectKey}
            // defaultSelectedKeys={["1"]}
            mode="inline"
            onSelect={(props)=>{console.log(props);}}>
            <Item icon={<DashboardOutlined/>} key="1" title="Dashboard">
                <Link to="/dashboard">概览</Link>
            </Item>
            <SubMenu icon={<BankOutlined/>} key="city" title="城市" >
                <Item key="2">
                    <Link to="/city/minprice">城市间航班信息</Link>
                </Item>
                <Item key="3">
                    <Link to="/city/avgprice">城市平均机票价格</Link>
                </Item>
                <Item key="4">
                    <Link to="/city/linenum">城市航班数</Link>
                </Item>
            </SubMenu>
            <SubMenu icon={<SendOutlined/>} key="flight" title="航班">
                <Item key="5">
                    <Link to="/flight/avgprice">平均机票价格</Link>
                </Item>
                <Item key="6">
                    <Link to="/flight/plane">航班飞机偏好</Link>
                </Item>
                <Item key="7">
                    <Link to="/flight/linenum">各大航空公司航班数</Link>
                </Item>
            </SubMenu>
            <SubMenu icon={<BarChartOutlined/>} key="corona" title="新冠与航班">
                <Item key="8">
                    <Link to="/corona/price">机票价格变化</Link>
                </Item>
                <Item key="9">
                    <Link to="/corona/linenum">感染人数与航班数</Link>
                </Item>
            </SubMenu>
            <Item icon={<RedditOutlined/>} key="10" title="你知道吗">
                <Link to="/triviel">你知道吗？</Link>
            </Item>
        </Menu>)
}

export default PageMenu