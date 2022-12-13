import {jwtVerify} from 'jose';
import { NextResponse } from 'next/server'

export async function middleware(req,res) {
    const jwt = req.cookies.get('authToken')
    const {pathname} = req.nextUrl;
    if(pathname == '/' || pathname == ''){
        return NextResponse.redirect(new URL('/auth/login',req.url))
    }
    if(pathname.startsWith('/auth')){
        if(jwt){
            try {
                const {payload} = await jwtVerify(jwt.value,new TextEncoder().encode(process.env.JWT_SECRET))
                if(payload)return NextResponse.redirect(new URL('/users/dashboard',req.url))
            } catch (error) {
                console.log(error)
                return NextResponse.next()        
            }
        }    
    }
    
    if(pathname.startsWith('/users')){
        if(jwt===undefined) {
            return NextResponse.redirect(new URL('/auth/login',req.url))
        }

        try {
            const {payload} = await jwtVerify(jwt.value,new TextEncoder().encode(process.env.JWT_SECRET))
            if(payload){
                return NextResponse.next()
            }
        } catch (error) {
            return NextResponse.redirect(new URL('/auth/login',req.url))
        }
        
    }



    return NextResponse.next()
}

export const config = {
  matcher: ['/users/:path*','/auth/:path*']
}

