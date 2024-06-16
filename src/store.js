import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./services/modalReducer";
import alert from "./services/alert";
import companyreducer from './services/company';
import detailmodal from "./services/detailmodal";
import updateform from "./services/updateform";
import formmodal from "./services/formmodal";
import pagereducer from "./services/table";
import gamereducer from "./services/game";
import tournamentreducer from "./services/tournament";
import prizereducer from "./services/prize";
import fileuploadReducer from './services/fileupload';
import contentreducer from './services/content';
import detailapimodal from "./services/detailapimodal";
import teamReducer from "./services/team";
export const store=configureStore({
    reducer:{
        modalReducer:modalReducer,
        alert:alert,
        companyreducer:companyreducer,
        detailmodal:detailmodal,
        updateformmodal:updateform,
        formmodal:formmodal,
        pagereducer:pagereducer,
        tournamentreducer:tournamentreducer,
        gamereducer:gamereducer,
        fileuploadreducer:fileuploadReducer,
        prizereducer:prizereducer,
        contentreducer:contentreducer,
        detailapimodal:detailapimodal,
        teamReducer:teamReducer,
        devTools:true
    }
});