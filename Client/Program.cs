using IdentityModel.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Client
{
    class Program
    {
        static void Main(string[] args)
        {
            //var token = GetClientToken();
            //CallApi(token);

            var token = GetUserToken();
            CallApi(token);
            Console.ReadKey();
        }

        static TokenResponse GetClientToken()
        {
            var client = new TokenClient(
                "http://localhost:5000/connect/token", "ddzf", "F621F470-9731-4A25-80EF-67A6F7C5F4B8");
            return client.RequestClientCredentialsAsync("api1").Result;
        }

        static TokenResponse GetUserToken()
        {
            var client = new TokenClient("http://localhost:5000/connect/token", "ddqk", "F621F470-9731-4A25-80EF-67A6F7C5F4B8");
            return client.RequestResourceOwnerPasswordAsync("test", "test", "api1").Result;
        }

        static void CallApi(TokenResponse response)
        {
            var client = new HttpClient();
            client.SetBearerToken(response.AccessToken);

            Console.WriteLine(client.GetStringAsync("https://localhost:44348/test").Result);
        }
    }
}
