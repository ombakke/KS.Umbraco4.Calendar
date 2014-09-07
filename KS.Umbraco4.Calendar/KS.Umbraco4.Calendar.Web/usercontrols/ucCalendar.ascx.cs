using KS.Umbraco4.Calendar.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace KS.Umbraco4.Calendar.Web
{
    public partial class ucCalendar : System.Web.UI.UserControl, umbraco.editorControls.userControlGrapper.IUsercontrolDataEditor
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public object value
        {
            get
            {
                return validateForm();
            }
            set
            {
                if (value != null) {
                    hidCalendar.Value = value.ToString();
                }
            }
        }

        private string validateForm(){
            try
            {
                CalendarEvent ce = JsonConvert.DeserializeObject<CalendarEvent>(hidCalendar.Value);
                if(1 < ce.recurrence && !ce.endDate.HasValue){
                    return null;
                }
                else if(ce.endDate.HasValue && ce.endDate.Value < ce.startDate){
                    return null;
                }
                return hidCalendar.Value;
            }
            catch (Exception ex) {
                return null;
            }
            
        }
    }
}