/**
 * Created by Derwish (derwish.pro@gmail.com) on 12.03.2017.
 * License: http://www.gnu.org/licenses/gpl-3.0.txt
 */

import PowerPlug from './devices/power-plug';
import EyecareLamp2 from './devices/eyecare-lamp2';
import YeelightColor from './devices/yeelight-color';

export default {
    'chuangmi.plug.m1': PowerPlug,
    'chuangmi.plug.v2': PowerPlug,
    // 'zimi.powerstrip.v2': PowerPlug,

    'philips.light.sread1': EyecareLamp2,
    'yeelink.light.color1': YeelightColor,


};    