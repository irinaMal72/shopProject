import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {authRoutes, authRoutesAdmin, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {userApp} = useContext(Context)

    //console.log(userApp._user.role)
    return (
        <Switch>
            {userApp.isAuth && userApp._user.role === "ADMIN" && authRoutesAdmin.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {userApp.isAuth && userApp._user.role === "USER" && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={SHOP_ROUTE}/>
        </Switch>
    );
});

export default AppRouter;
