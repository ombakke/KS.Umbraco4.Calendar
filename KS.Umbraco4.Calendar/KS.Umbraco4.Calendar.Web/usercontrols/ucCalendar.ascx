﻿<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucCalendar.ascx.cs" Inherits="KS.Umbraco4.Calendar.Web.ucCalendar" %>

<link href="/css/backend/ks.umbraco4.calendar.css" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="/css/backend/jquery.datetimepicker.css"/ >

<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.min.js"></script>
<script src="/scripts/backend/ks.umbraco4.calendar.controller.js?0"></script>
<script src="/scripts/backend/jquery.datetimepicker.js"></script>	

<div ng-app="KS.Calendar" ng-controller="KS.CalendarController">
    <input type="hidden" ID="hidCalendar" ClientIDMode="Static" runat="server" ng-model="data"/>
    <div class="fullWidth input-append date datepicker" id="StartDateWrapper">
        <label for="dtStartDate">{{language.startDate}}</label>
        <input type="datetime" id="dtStartDate" ng-model="data.startDate" ng-required="true" name="startdate" />
    </div>
    <br />
    <div class="fullWidth input-append date datepicker" id="EndDateWrapper" ">
        <label for="dtEndDate">{{language.endDate}}</label>
        <input type="datetime" id="dtEndDate" ng-model="data.endDate" name="enddate" enddate ng-required="data.recurrence > 1"/>
    </div>
    <br />
    <div class="fullWidth">
        <label>{{language.recurrence}}</label>
        <select class="full" ng-model="data.recurrence" ng-options="option.id as option.name for option in options"></select>
    </div>

    <div class="divider" ng-if="data.recurrence > '1'"></div>

    <div ng-if="data.recurrence ==='3'" class="fullWidth top20">
        <span class="selectPreText selectLabel">{{language.every}}</span>
        <select ng-model="data.weekInterval" ng-options="week.id as week.name for week in weeks"></select>
        <span class="selectPostText selectLabel">{{language.weekOn}}</span>
    </div>

    <div ng-if="data.recurrence === '3' || data.recurrence === '2'" class="days">
        <label ng-repeat="day in days">
            <input type="checkbox" ng-checked="data.days.indexOf(day.id) >= 0" ng-click="toggleDay(day.id)" />{{day.name}}
        </label>
    </div>

    <div ng-if="data.recurrence === '5' || data.recurrence =='4'" class="fullWidth monthYearOption">
        <label ng-repeat="m in monthYearOptions">
            <input type="radio" name="rdMonthYearOption" ng-checked="data.monthYearOption === m.id" ng-click="selectMonthYearOption(m.id)" />{{m.name}}
        </label>
    </div>

    <div class="fullWidth">
        <select class="monthYearDD" ng-model="data.interval" ng-options="interval.id as interval.name for interval in intervals" ng-if="data.recurrence === '5' || data.recurrence =='4'" ng-disabled="data.monthYearOption === '1'"></select>
        <select class="monthYearDD" ng-model="data.weekDay" ng-options="day.id as day.name for day in days" ng-if="data.recurrence === '5' || data.recurrence =='4'" ng-disabled="data.monthYearOption === '1'"></select>
        <select class="monthYearDD" ng-model="data.month" ng-options="month.id as month.name for month in months" ng-if="data.recurrence === '5'" ng-disabled="data.monthYearOption === '1'"></select>
    </div>

        
    <div ng-if="data.recurrence =='4'" class="fullWidth monthOption">
        <label ng-repeat="mo in monthOptions">
            <input type="radio" name="rdMonthOption" ng-checked="data.monthOption === mo.id" ng-click="selectMonthOption(mo.id)" />{{mo.name}}
        </label>
    </div>

    <div ng-if="data.recurrence === '4' && data.monthOption === '2'" class="days">
        <label ng-repeat="month in months">
            <input type="checkbox" ng-checked="data.months.indexOf(month.id) >= 0" ng-click="toggleMonth(month.id)" />{{month.name}}
        </label>
    </div>
</div>