using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Windows.Forms;

namespace WebTest.Controllers
{
    public class TestController : Controller
    {
        private static BBSSearchService.BBSClient BBSSearchClient = new BBSSearchService.BBSClient();

        [HttpGet, STAThread]
        public ActionResult List()
        {
            //WebBrowser browser = new WebBrowser();
            //browser.ScriptErrorsSuppressed = true;
            ////browser.Navigate("");
            ////执行下一步            
            //browser.Document.InvokeScript("next");
            ////browser.Document.InvokeScript("return false");


            System.Threading.Thread t = new System.Threading.Thread(ThreadStart);
            t.SetApartmentState(System.Threading.ApartmentState.STA);
            t.Start();

            return View();

        }

        private static void ThreadStart()
        {
            WebBrowser browser = new WebBrowser();
            browser.Dock = DockStyle.Fill;
            browser.Name = "webBrowser";
            browser.ScrollBarsEnabled = false;
            browser.TabIndex = 0;
            browser.Navigate("http://onlinebook.szreorc.com:8888/onlinebook/goBookWeb.do?method=goBookWeb&szItemNo=FZ20150730");

            Form form = new Form();
            form.WindowState = FormWindowState.Maximized;
            form.Controls.Add(browser);
            form.Name = "Browser";
            Application.Run(form);
            //object obj = browser.Document.InvokeScript("next");

            //form.WindowState = FormWindowState.Minimized;
            //form.Visible = false;
            //form.ShowInTaskbar = false;            
        }
    }
}