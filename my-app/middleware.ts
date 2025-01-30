import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated} from "./_server/utils/jwt";

export const runtime = "nodejs";

export async function middleware(req: NextRequest) {

    // const token = req.cookies.get("token")?.value;
    // console.log("Middleware token " + token)

    // if (!token) {
    //   return NextResponse.redirect(new URL('/login', req.url));
    // }

    // try {
    //   const isAuntificated = await isAuthenticated(req);
    //   if(isAuntificated){
    //     console.log("Verification successed!!!")
    //     return NextResponse.next();
    //   }
    //   else{
    //     console.log("Err isAUTH")
    //   }

    // } catch (error) {

    //   console.log(error)
    //   return NextResponse.redirect(new URL('/login', req.url));
      
    // }
}

export const config = { 
    matcher: ["/" ]
};
