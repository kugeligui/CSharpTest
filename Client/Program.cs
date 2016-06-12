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

            //var token = GetUserToken();
            //Console.WriteLine(token.Error);

            CallApi("1d9376bad421fa3676ab1d0e49326d61");
            //CallApi(token.AccessToken);
            Console.ReadKey();
        }

        //static TokenResponse GetClientToken()
        //{
        //    var client = new TokenClient(
        //        "http://localhost:5000/connect/token", "ddzf", "F621F470-9731-4A25-80EF-67A6F7C5F4B8");
        //    return client.RequestClientCredentialsAsync("api1").Result;
        //}

        static TokenResponse GetUserToken()
        {
            var client = new TokenClient("http://localhost:5000/connect/token", "ddzf", "F621F470");
            return client.RequestResourceOwnerPasswordAsync("斑竹", "123456", "get_user_info").Result;
            //return client.RequestResourceOwnerPasswordAsync(null, dict).Result;
        }

        static void CallApi(string accessToken)
        {
            var client = new HttpClient();
            client.SetBearerToken(accessToken);
            // Aut.. Bear token
            //client.
            Console.WriteLine(client.GetStringAsync("https://localhost:44310/get_user_info").Result);
        }
    }
}
