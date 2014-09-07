KS.Umbraco4.Calendar
====================
Calendar data type for Umbraco 4 and Umbraco 6


Getting started:

    Install the package in Umbraco version 4.9.1 or higher
    Create a data type based on the property editor Umbraco Usercontrol Wrapper and select the usercontrol ucCalendar.ascx
    Add the data type to a document type
    Create some content
    Create a new Razor-script file
    Use the namespace KS.Umbraco4.Calendar.Core
    Get list of CalendarEvents with Calendar.getEvents(DateTime startDate, DateTime endDate, string propertyType)
