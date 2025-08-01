// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        v3.21.6
// source: proto/mail.proto

package proto

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

// Email request message
type MailRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Recipient string `protobuf:"bytes,1,opt,name=recipient,proto3" json:"recipient,omitempty"`
	Subject   string `protobuf:"bytes,2,opt,name=subject,proto3" json:"subject,omitempty"`
	Body      string `protobuf:"bytes,3,opt,name=body,proto3" json:"body,omitempty"`
}

func (x *MailRequest) Reset() {
	*x = MailRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_mail_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MailRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MailRequest) ProtoMessage() {}

func (x *MailRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_mail_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MailRequest.ProtoReflect.Descriptor instead.
func (*MailRequest) Descriptor() ([]byte, []int) {
	return file_proto_mail_proto_rawDescGZIP(), []int{0}
}

func (x *MailRequest) GetRecipient() string {
	if x != nil {
		return x.Recipient
	}
	return ""
}

func (x *MailRequest) GetSubject() string {
	if x != nil {
		return x.Subject
	}
	return ""
}

func (x *MailRequest) GetBody() string {
	if x != nil {
		return x.Body
	}
	return ""
}

// Email response message
type MailResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Success bool   `protobuf:"varint,1,opt,name=success,proto3" json:"success,omitempty"`
	Message string `protobuf:"bytes,2,opt,name=message,proto3" json:"message,omitempty"`
}

func (x *MailResponse) Reset() {
	*x = MailResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_mail_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MailResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MailResponse) ProtoMessage() {}

func (x *MailResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_mail_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MailResponse.ProtoReflect.Descriptor instead.
func (*MailResponse) Descriptor() ([]byte, []int) {
	return file_proto_mail_proto_rawDescGZIP(), []int{1}
}

func (x *MailResponse) GetSuccess() bool {
	if x != nil {
		return x.Success
	}
	return false
}

func (x *MailResponse) GetMessage() string {
	if x != nil {
		return x.Message
	}
	return ""
}

var File_proto_mail_proto protoreflect.FileDescriptor

var file_proto_mail_proto_rawDesc = []byte{
	0x0a, 0x10, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6d, 0x61, 0x69, 0x6c, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x12, 0x05, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0x59, 0x0a, 0x0b, 0x4d, 0x61, 0x69,
	0x6c, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x1c, 0x0a, 0x09, 0x72, 0x65, 0x63, 0x69,
	0x70, 0x69, 0x65, 0x6e, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09, 0x72, 0x65, 0x63,
	0x69, 0x70, 0x69, 0x65, 0x6e, 0x74, 0x12, 0x18, 0x0a, 0x07, 0x73, 0x75, 0x62, 0x6a, 0x65, 0x63,
	0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x73, 0x75, 0x62, 0x6a, 0x65, 0x63, 0x74,
	0x12, 0x12, 0x0a, 0x04, 0x62, 0x6f, 0x64, 0x79, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04,
	0x62, 0x6f, 0x64, 0x79, 0x22, 0x42, 0x0a, 0x0c, 0x4d, 0x61, 0x69, 0x6c, 0x52, 0x65, 0x73, 0x70,
	0x6f, 0x6e, 0x73, 0x65, 0x12, 0x18, 0x0a, 0x07, 0x73, 0x75, 0x63, 0x63, 0x65, 0x73, 0x73, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x08, 0x52, 0x07, 0x73, 0x75, 0x63, 0x63, 0x65, 0x73, 0x73, 0x12, 0x18,
	0x0a, 0x07, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x07, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x32, 0x42, 0x0a, 0x0b, 0x4d, 0x61, 0x69, 0x6c,
	0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x33, 0x0a, 0x08, 0x53, 0x65, 0x6e, 0x64, 0x4d,
	0x61, 0x69, 0x6c, 0x12, 0x12, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x4d, 0x61, 0x69, 0x6c,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x13, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e,
	0x4d, 0x61, 0x69, 0x6c, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x42, 0x09, 0x5a, 0x07,
	0x2e, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_proto_mail_proto_rawDescOnce sync.Once
	file_proto_mail_proto_rawDescData = file_proto_mail_proto_rawDesc
)

func file_proto_mail_proto_rawDescGZIP() []byte {
	file_proto_mail_proto_rawDescOnce.Do(func() {
		file_proto_mail_proto_rawDescData = protoimpl.X.CompressGZIP(file_proto_mail_proto_rawDescData)
	})
	return file_proto_mail_proto_rawDescData
}

var file_proto_mail_proto_msgTypes = make([]protoimpl.MessageInfo, 2)
var file_proto_mail_proto_goTypes = []interface{}{
	(*MailRequest)(nil),  // 0: proto.MailRequest
	(*MailResponse)(nil), // 1: proto.MailResponse
}
var file_proto_mail_proto_depIdxs = []int32{
	0, // 0: proto.MailService.SendMail:input_type -> proto.MailRequest
	1, // 1: proto.MailService.SendMail:output_type -> proto.MailResponse
	1, // [1:2] is the sub-list for method output_type
	0, // [0:1] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_proto_mail_proto_init() }
func file_proto_mail_proto_init() {
	if File_proto_mail_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_proto_mail_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MailRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_mail_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MailResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_proto_mail_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   2,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_proto_mail_proto_goTypes,
		DependencyIndexes: file_proto_mail_proto_depIdxs,
		MessageInfos:      file_proto_mail_proto_msgTypes,
	}.Build()
	File_proto_mail_proto = out.File
	file_proto_mail_proto_rawDesc = nil
	file_proto_mail_proto_goTypes = nil
	file_proto_mail_proto_depIdxs = nil
}
