﻿using System;

namespace Zybach.Swagger.Logging;

[AttributeUsage(AttributeTargets.Method)]
public class LogIgnoreAttribute : Attribute
{
    public LogIgnoreAttribute() { }
}