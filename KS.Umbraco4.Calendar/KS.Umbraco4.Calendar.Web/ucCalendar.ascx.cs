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
                return hidCalendar.Value;
            }
            set
            {
                if (value != null) {
                    hidCalendar.Value = value.ToString();
                }
            }
        }
    }
}