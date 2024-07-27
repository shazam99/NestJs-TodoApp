import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { BY_PASS_URLS } from "src/utils/constants";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt"){

    canActivate(context: ExecutionContext) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();

        for (let i = 0; i < BY_PASS_URLS.length; i++ ){
            if(request.url == BY_PASS_URLS[i]) return true;
        }

        return super.canActivate(context);
    }
}