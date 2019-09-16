import React from 'react';
import { Router, Route, Redirect } from 'react-router';

import Piaocaishuiyitihua from './views/piaocaishuiyitihua/Piaocaishuiyitihua.js';
import Zhinengpingzheng from './views/zhinengpingzheng/Zhinengpingzheng.js';
import Zhinengjiezhang from './views/zhinengjiezhang/Zhinengjiezhang.js';
import Fapiaoyusuan from './views/fapiaoyusuan/Fapiaoyusuan.js';
import Shuiwufengxianjiancha from './views/shuiwufengxianjiancha/Shuiwufengxianjiancha.js';
import Xianjinliufenxi from './views/xianjinliufenxi/Xianjinliufenxi.js';
import Jingyingzhuangkuangfenxi from './views/jingyingzhuangkuangfenxi/Jingyingzhuangkuangfenxi.js';
import Yinglizhibiaofenxi from './views/yinglizhibiaofenxi/Yinglizhibiaofenxi.js';
import Dabiaoxuanche from './views/dabiaoxuanche/Dabiaoxuanche.js';
import Salecar from './views/salecar/Salecar.js';
import Sifapaimai from './views/sifapaimai/Sifapaimai.js';
import Index from './views/index/Index.js';
import Carinfo from './views/carinfo/Carinfo.js';


export default (history) => {
    return <Router history={history}>
        <Route path="/piaocaishuiyitihua" component={Piaocaishuiyitihua}></Route>
        <Route path="/zhinengpingzheng" component={Zhinengpingzheng}></Route>
        <Route path="/zhinengjiezhang" component={Zhinengjiezhang}></Route>
        <Route path="/fapiaoyusuan" component={Fapiaoyusuan}></Route>
        <Route path="/shuiwufengxianjiancha" component={Shuiwufengxianjiancha}></Route>
        <Route path="/xianjinliufenxi" component={Xianjinliufenxi}></Route>
        <Route path="/jingyingzhuangkuangfenxi" component={Jingyingzhuangkuangfenxi}></Route>
        <Route path="/yinglizhibiaofenxi" component={Yinglizhibiaofenxi}></Route>
        <Route path="/dabiaoxuanche" component={Dabiaoxuanche}></Route>
        <Route path="/salecar" component={Salecar}></Route>
        <Route path="/sifapaimai" component={Sifapaimai}></Route>
        <Route path="/" component={Index}></Route>
        <Route path="/carinfo/:id" component={Carinfo}></Route>
        {/* 跳转 */}
        <Redirect from="/index" to="/" />
        <Redirect from="/caiwu" to="/piaocaishuiyitihua" />
        <Redirect from="/shuiwu" to="/fapiaoyusuan" />
        <Redirect from="/guanli" to="/xianjinliufenxi" />
        <Redirect from="/ershouche" to="/dabiaoxuanche" />
    </Router>;
}


