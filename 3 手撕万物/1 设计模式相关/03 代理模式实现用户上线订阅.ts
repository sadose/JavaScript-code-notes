// 该实现方案是对发布订阅模式的改进，只在遵循单一功能原则，在 online 方法中只负责用户上线状态更改相关的事宜，
// 而将通知订阅者的操作移到代理中进行

// 这部分与发布订阅模式的实现除了 online 方法外都一样
type Notify = (user: User) => void;

class User {
    name: string;
    status: "offline" | "online";
    followers: { user: User; notify: Notify }[];

    constructor(name: string) {
        this.name = name;
        this.status = "offline";
        this.followers = [];
    }

    subscribe(user: User, notify: Notify) {
        this.followers.push({ user, notify });
    }

    // online 方法只负责用户状态变更
    online() {
        this.status = "online";
    }
}

// 额外的内容：设置代理
export const createProxyUser = (name: string) => {
    const user = new User(name);

    const notifyStatusHandles = (user: User, status: "offline" | "online") => {
        // 判断是否对用户进行通知
        if (status === "online") {
            user.followers.forEach(({ notify }) => {
                notify(user);
            })
        }
    };

    const proxyUser = new Proxy(user, {
        set(target, property: keyof User, value) {
            target[property] = value;
            if (property === "status") {
                // 改变的属性是 status 时，进入通知流程
                notifyStatusHandles(target, value);
                // 可以通过定义使用更多 handles 来方便地实现功能的扩展
            }
            return true;
        }
    });

    return proxyUser;
}
