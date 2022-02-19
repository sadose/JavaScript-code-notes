// 提醒函数的类型定义，提醒函数用于对用户 user 的动作进行发布（给它的订阅者）。
type Notify = (user: User) => void;

// 支持订阅发布机制的用户类
export class User {
    name: string;
    status: "offline" | "online";
    // 订阅实例的数组；订阅实例包含了订阅者的信息以及决定订阅方式的订阅函数
    followers: { user: User; notify: Notify }[];

    // 构造函数，初始化用户信息
    constructor(name: string) {
        this.name = name;
        this.status = "offline";
        this.followers = [];
    }

    // 添加订阅者
    subscribe(user: User, notify: Notify) {
        this.followers.push({ user, notify });
    }

    // 用户上线依次触发各个订阅者的 notify 回调函数
    online() {
        this.status = "online";
        this.followers.forEach(({ notify }) => {
            notify(this);
        });
    }
}
