/**
 * Copyright (C) 2021 Unicorn a.s.
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public
 * License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License at
 * <https://gnu.org/licenses/> for more details.
 *
 * You may obtain additional information at <https://unicorn.com> or contact Unicorn a.s. at address: V Kapslovne 2767/2,
 * Praha 3, Czech Republic or at the email: info@unicorn.com.
 */

//@@viewOn:imports
import * as UU5 from "uu5g04";
import ns from "./bricks-ns.js";

import Span from "./span.js";
import { Div } from "./factory.js";

import "./screen-size-item.less";
//@@viewOff:imports

const SCREEN_SIZES = ["xs", "s", "m", "l", "xl"];

export default UU5.Common.VisualComponent.create({
  displayName: "screen-size-item", // for backward compatibility (test snapshots)
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.ElementaryMixin, UU5.Common.NestingLevelMixin, UU5.Common.ContentMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: ns.name("ScreenSize.Item"),
    nestingLevelList: UU5.Environment.getNestingLevelList("spa"),
    classNames: {
      main: ns.css("screen-size-item"),
    },
    opt: {
      nestingLevelWrapper: true,
    },
    errors: {
      invalidParent: "Parent of this component is not ScreenSize.",
    },
    editMode: {
      enableWrapper: false,
      enablePlaceholder: true,
    },
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    screenSize: UU5.PropTypes.oneOfType([
      UU5.PropTypes.string,
      UU5.PropTypes.arrayOf(UU5.PropTypes.oneOf(SCREEN_SIZES)),
    ]).isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps: function () {
    return {
      screenSize: null,
    };
  },
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  UNSAFE_componentWillMount: function () {
    let parent = this.getParent();

    if (parent) {
      while (parent.getOpt("parentWrapper")) {
        parent = parent.getParent();
      }
    }

    if (!(parent && parent.isScreenSize)) {
      this.showError("invalidParent");
    }
  },
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  //@@viewOff:private

  //@@viewOn:render
  render: function () {
    let children =
      this.getNestingLevel() === "inline" ? (
        <Span {...this.getMainPropsToPass()} content={this.props.content}>
          {this.props.children && UU5.Common.Children.toArray(this.props.children)}
        </Span>
      ) : (
        <Div {...this.getMainPropsToPass()} content={this.props.content}>
          {this.props.children && UU5.Common.Children.toArray(this.props.children)}
        </Div>
      );
    return children;
  },
  //@@viewOff:render
});
