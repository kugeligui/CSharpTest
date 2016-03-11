using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsTest
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            WebBrowser browser = new WebBrowser();
            browser.Dock = DockStyle.Fill;
            browser.Name = "webBrowser";
            browser.ScrollBarsEnabled = false;
            browser.TabIndex = 0;
            browser.Navigate("http://onlinebook.szreorc.com:8888/onlinebook/goBookWeb.do?method=goBookWeb&szItemNo=FZ20150730");
            browser.DocumentCompleted += Browser_DocumentCompleted;

        }

        private void Browser_DocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
        {
            WebBrowser browser = sender as WebBrowser;
            object obj = browser.Document.InvokeScript("next");
            while (true)
            {
                var personName = browser.Document.GetElementById("personName");
                if (personName == null)
                {
                    Thread.Sleep(500);
                }
            }
        }
    }
}
