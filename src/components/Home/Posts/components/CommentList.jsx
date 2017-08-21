import React from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import Chip from 'material-ui/Chip';

const style =  {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'inline-flex',
        flexWrap: 'wrap',
    },
};

const CommentList = (props) => (
    <div className="comments-holder">
        <Card>
            <CardHeader
            title={props.body}
             />
            {props.tags.map((tag, index) => {
                return (
                    <div style={style.wrapper}>
                    <Chip style={style.chip}>
                        {tag}
                    </Chip>
                    </div>
                )
            })}     
        </Card>
  </div>
);

export default CommentList