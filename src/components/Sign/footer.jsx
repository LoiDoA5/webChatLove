 import React from 'react';
 import PropTypes from 'prop-types';
 import './footer.scss';
 
 
 Footer.propTypes = {
     
 };
 
 function Footer(props) {
     return (
      
        <div style={{width:'100%'}} class=" pt-5 pb-5 footer">
           

                    <div class="container">
                    <div class="row">
                        <div class="col-lg-5 col-xs-12 about-company">
                        <h2>Tiêu Đề</h2>
                        <p class="pr-5 text-white-50"> Hỗ trợ gửi tin nhắn văn bản. Bạn cũng có thể trò chuyện nhóm hoặc bạn có thể tìm bạn bè xung quanh để trò chuyện </p>
                        <p><a href="#"><i class="fa fa-facebook-square mr-1"></i></a><a href="#"><i class="fa fa-linkedin-square"></i></a></p>
                        </div>
                        <div class="col-lg-3 col-xs-12 links">
                        <h4 class="mt-lg-0 mt-sm-3">Giới Thiệu</h4>
                            <ul class="m-0 p-0">
                            <li>- <a href="#">Bảo mật người dùng</a></li>
                            <li>- <a href="#">Liên kết nhanh</a></li>
                            <li>- <a href="#">Dịch vụ hỗ trợ tốt </a></li>
                            <li>- <a href="#">Đơn giản và dễ sử dụng</a></li>
                            <li>- <a href="#">Luôn cập nhật , cải tiến</a></li>
                            
                            </ul>
                        </div>
                        <div class="col-lg-4 col-xs-12 location">
                        <h4 class="mt-lg-0 mt-sm-4">Vị Trí</h4>
                        <p> 132 Đường D2, P. 25, Quận Bình Thạnh, TP. HCM</p>
                        <p class="mb-0"><i class="fa fa-phone mr-3"></i>0902418899</p>
                        <p><i class="fa fa-envelope-o mr-3"></i>webchat@gmail.com</p>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col copyright">
                        <p class=""><small class="text-white-50">© 2021. Đã Đăng Ký Bản Quyền.</small></p>
                        </div>
                    </div>
                    </div>
       
</div>
 
     );
 }
 
 export default Footer;