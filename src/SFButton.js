/**
 * Created by rw on 2018/4/7
 * GitHub:多图查看器，包括放大缩小，视频、长图查看。提供显示和隐藏动画
 *
 */
import React, {Component} from "react";
import {
    Image,
    View,
    TouchableWithoutFeedback,
    Text,
    Animated,
    ImageBackground
} from "react-native";
import PropTypes from 'prop-types'
import callOnceInInterval from "./CallOnceInInterval"
const resolveAssetSource = Image.resolveAssetSource;
export default class SFButton extends Component {

    constructor(props) {
        super(props)
        this.state={
            isSelect:false,
            bgColor:''
        }
    }
    static ButtonType = {
        color:0,
        image:1,
        iconTitle:2,
        custom:3
    }
    static propTypes = {
        type:PropTypes.number.isRequired,
        tag:PropTypes.any,
        direction:PropTypes.string,
        isAnimated:PropTypes.bool,
        defaultImage: PropTypes.number,
        selectImage: PropTypes.number,
        defaultColor:PropTypes.string,
        selectColor:PropTypes.string,
        defaultIcon:PropTypes.number,
        selectIcon:PropTypes.number,
        iconRatio:PropTypes.number,
        iconWidth:PropTypes.number,
        iconHeight:PropTypes.number,
        iconMargin:PropTypes.array,
        titelMargin:PropTypes.array,
        title:PropTypes.string,
        titleColor:PropTypes.string,
        titleFontSize:PropTypes.number,
        titleAlign:PropTypes.string,
        titleFontWeight:PropTypes.string,
        titleFontFamily:PropTypes.string,
        containerStyle:PropTypes.object,
        onPress: PropTypes.func,
        onPressIn:PropTypes.func,
        onPressOut:PropTypes.func
    }
    static defaultProps = {
        isAnimated:false,
        tag:0,
        titleAlign : 'center',
        titleFontSize : 16,
        titleFontWeight : 'normal',
        defaultColor : 'transparent',
        direction:'row'
    };
    onPress = () => {
        if (this.props.onPress){
            this.props.onPress(this.props.tag);
        }
    }
    onPressIn = () => {
        this.setState({
            isSelect:true
        })
        if (this.props.isAnimated){
            this.scale.setValue(0.8)
        }
    }
    onPressOut = () => {
        this.setState({
            isSelect:false
        })
        if (this.props.isAnimated){
            this.scale.setValue(1)
        }
    }
    render_title = () => {
        if (!this.props.title){
            return null;
        }
        var titleMarginStyle = null;
        if (this.props.titelMargin){
            titleMarginStyle={
                marginLeft:this.props.titelMargin[0],
                marginRight:this.props.titelMargin[2],
                marginTop:this.props.titelMargin[1],
                marginBottom:this.props.titelMargin[3]
            }
        }
        return(
            <Text style={[{
                color:this.props.titleColor,
                fontSize:this.props.titleFontSize,
                textAlign:this.props.titleAlign,
                fontWeight:this.props.titleFontWeight,
                fontFamily:this.props.titleFontFamily
            },titleMarginStyle]}>{this.props.title}</Text>
        )
    }
    render_color = () => {
        var bgColor = this.props.defaultColor;
        if (this.state.isSelect){
            if (this.props.selectColor){
                bgColor = this.props.selectColor;
            }

        }
        return(
            <View style={{
                backgroundColor:bgColor,
                alignItems:'center',
                justifyContent:'center',
                flex:1
            }}>
                {this.render_title()}
            </View>
        )
    }
    render_image = () => {
        var bgImage = this.props.defaultImage;
        if (this.state.isSelect){
            if (this.props.selectImage){
                bgImage = this.props.selectImage;
            }

        }
        return(
            <ImageBackground resizeMode="contain" source={bgImage} style={{
                alignItems:'center',
                justifyContent:'center',
                flex:1
            }}>
                {this.render_title()}
            </ImageBackground>
        )
    }
    render_iconTitle = () => {
        var bgColor = this.props.defaultColor;
        if (this.state.isSelect){
            if (this.props.selectColor){
                bgColor = this.props.selectColor;
            }
        }
        var icon = this.props.defaultIcon;
        if (this.state.isSelect){
            if (this.props.selectIcon){
                icon = this.props.selectIcon;
            }
        }
        var iconMarginStyle = null;
        if (this.props.iconMargin){
            iconMarginStyle={
                marginLeft:this.props.iconMargin[0],
                marginRight:this.props.iconMargin[2],
                marginTop:this.props.iconMargin[1],
                marginBottom:this.props.iconMargin[3]
            }
        }
        var titleMarginStyle = null;
        if (this.props.titelMargin) {
            titleMarginStyle = {
                marginLeft: this.props.titelMargin[0],
                marginRight: this.props.titelMargin[2],
                marginTop: this.props.titelMargin[1],
                marginBottom: this.props.titelMargin[3]
            }
        }
        var iconFlexStyle = null;
        var titleFlexStyle = null;
        if (this.props.iconRatio){
            iconFlexStyle = {flex:1};
            titleFlexStyle = {flex:(1-this.props.iconRatio)/this.props.iconRatio}
        }
        return(
            <View style={{
                backgroundColor:bgColor,
                flexDirection:this.props.direction,
                alignItems:'center',
                justifyContent:'center',
                flex:1
            }}>
                <Image resizeMode="contain" source={icon} style={[{
                    width:this.iconWidth,
                    height:this.iconHeight,
                },iconMarginStyle,iconFlexStyle]}>

                </Image>


                <Text style={[{
                    color:this.props.titleColor,
                    fontSize:this.props.titleFontSize,
                    textAlign:this.props.titleAlign,
                    fontWeight:this.props.titleFontWeight,
                    fontFamily:this.props.titleFontFamily
                },titleMarginStyle,titleFlexStyle]}>{this.props.title}</Text>
            </View>
        )
    }

    render_children = () => {
        return this.props.children
    }
    renderContainer = () => {
        if (this.props.type == 0){
            return this.render_color()
        }else if (this.props.type == 1){
            return this.render_image()
        }else if (this.props.type == 2){
            return this.render_iconTitle()
        }else if (this.props.type == 3){
            return this.render_children()
        }
    }
    render() {
        return(
            <TouchableWithoutFeedback
                onPress={() => callOnceInInterval(this.onPress)}
                onPressIn={() => callOnceInInterval(this.onPressIn)}
                onPressOut={() => callOnceInInterval(this.onPressOut})>
                <Animated.View
                    style={
                        [this.props.containerStyle,{overflow:'hidden',transform:[{scale:this.scale}]}]
                    }
                >
                    {this.renderContainer()}
                </Animated.View>
            </TouchableWithoutFeedback>
        )

    }

    componentWillMount() {
        this.scale = new Animated.Value(1);
        if (this.props.type == 0){

        }else if (this.props.type == 1){

        }else if (this.props.type == 2){
            var source = resolveAssetSource(this.props.defaultIcon);
            if (this.props.iconWidth && this.props.iconHeight){
                this.iconWidth = this.props.iconWidth;
                this.iconHeight = this.props.iconHeight;
            }else if (!this.props.iconWidth && this.props.iconHeight){
                this.iconWidth = source.width*this.props.iconHeight/source.height;
                this.iconHeight = this.props.iconHeight;
            }else if (this.props.iconWidth && !this.props.iconHeight){
                this.iconWidth = this.props.iconWidth;
                this.iconHeight = source.height*this.props.iconWidth/source.width;
            }else{
                this.iconWidth = source.width;
                this.iconHeight = source.height;
            }
        }else if (this.props.type == 3){

        }



    }

    componentDidMount(){

    }



}
