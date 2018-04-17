import React, {Component} from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	FlatList,
	Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import Intro from './Intro'

export default class App extends Component{
	
	state = {
		width,
		height,
		activeIndex: 0,
	};
	
	
	_renderItem(data){
		return (
			<View style={{backgroundColor: '#'+(Math.random()*0xFFFFFF<<0).toString(16), flex: 1, width, height, justifyContent: 'center', alignItems:'center'}}>
				<Text>{data.item.title}</Text>
			</View>
		)
		
	}
	
	
	componentDidMount() {
		console.log('ok')
		const { width, height } = Dimensions.get('window');
		if (width !== this.state.width || height !== this.state.height) {
			// Set new width to update rendering of pages
			this.setState({ width, height });
			// Set new scroll position
			const func = () => { this.flatList.scrollToOffset({ offset: this.state.activeIndex * width, animated: false }) }
			Platform.OS === 'android' ? setTimeout(func, 0) : func();
		}
	}
	
	
	_onMomentumScrollEnd = (e) => {
		console.log(e.nativeEvent);
		const offset = e.nativeEvent.contentOffset.x;
		const newIndex = Math.round(offset / this.state.width);
		if (newIndex === this.state.activeIndex) {
			return;
		}
		const lastIndex = this.state.activeIndex;
		this.setState({ activeIndex: newIndex });
		this.props.onSlideChange && this.props.onSlideChange(newIndex, lastIndex);
	}
	
	
	render() {
		return (
			<FlatList
				ref={(ref) => { this.flatList = ref; }}
				data={[{title: "Emran"}, {title: "Mahmiud"}, {title: "Farha"}, {title: "Tamim"}, {title: "Shamim"}]}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				bounces={false}
				pagingEnabled
				renderItem={this._renderItem}
				keyExtractor={(data, id)=>id+''}/>
			
		);
	}
}