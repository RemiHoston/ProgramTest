﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace LittleSeagull.WebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API 配置和服务

            // Web API 路由
            config.MapHttpAttributeRoutes();
            //<测试代码>fsgdhjkl
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",    
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
