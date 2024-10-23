import ListProductRoute from "./listProductRoute";
import OrderDetailRoute from "./orderDetailRoute";
import OrderRoute from "./orderRoute";
import ProductRoute from "./productRoute";
import StaffRoute from "./staffRoute";
import UserRoute from "./userRoute";
import EventRoute from "./eventRoute";
import PointRoute from "./pointRoute";
import RegionRoute from "./regionRoute";
import SocialRoute from "./socialRoute";
import CommentReviewRoute from "./commentReviewRoute";
import PaymentOnlineRoute from "./paymentOnlineRoute";


export const routes = (app) => {
    UserRoute(app);
    StaffRoute(app);
    ProductRoute(app);
    OrderRoute(app);
    OrderDetailRoute(app);
    ListProductRoute(app);
    EventRoute(app);
    PointRoute(app);
    RegionRoute(app);
    SocialRoute(app);
    CommentReviewRoute(app);
    PaymentOnlineRoute(app);
};
