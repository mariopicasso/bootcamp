const Notification = ({ notification }) => {
    console.log(notification);

    if (notification !== null) {
        const notificationStyle = {
            color: notification.color,
            backgroundColor: "lightgray",
            fontSize: 20,
            borderStyle: "solid",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
        };
        return <div style={notificationStyle}>{notification.message}</div>;
    }

    return null;
};

export default Notification;
