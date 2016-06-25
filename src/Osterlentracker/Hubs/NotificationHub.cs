using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Hubs;

namespace Osterlentracker.Hubs
{
    public class  Notification
    {
        
    }

    [HubName("chat")]
    //[Authorize]
    public class NotificationHub : Hub
    {
        public void SendNotification(string userName, Notification notification) {
            Clients.Client(userName).onNotificationReceived(notification);
        }

        public override Task OnConnected()
        {
            //string name = Context.User.Identity.Name;
            //Groups.Add(Context.ConnectionId, name);
            return base.OnConnected();
        }
    }
}