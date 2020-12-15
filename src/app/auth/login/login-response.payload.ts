export interface LoginResponse{
    authenticationToken:String;
    username:String;
    refreshToken:String;
    expireAt:Date;
}