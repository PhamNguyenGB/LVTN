import './Profile.scss';


const Profile = () => {
    return (
        <>
            <div className='container'>
                <div class="frame row mt-5">
                    <div class="center col-md-3 col-10 m-2">
                        <div class="profile">
                            <div class="image">
                                <div class="circle-1"></div>
                                <div class="circle-2"></div>
                                <img src="./z5379414456676_15a0f6e702a6dfc36fcf9986d5970c1d.jpg" alt="" width="70" height="70" />
                            </div>

                            <div class="name">Lê Thị Tú Sương</div>
                            <div class="job">Student</div>

                            <div class="actions">
                                <button class="btn">Follow</button>
                                <button class="btn">Mesage</button>
                            </div>
                        </div>

                        <div class="stats">
                            <div class="box">
                                <span class="value">1</span>
                                <span class="parameter">Posts</span>
                            </div>
                            <div class="box">
                                <span class="value">100</span>
                                <span class="parameter">Likes</span>
                            </div>
                            <div class="box">
                                <span class="value">3</span>
                                <span class="parameter">Follower</span>
                            </div>
                        </div>
                    </div>
                    <div className='m-2 col-md-8 col-10 info'>
                        <section style={{ backgroundColor: "#eee" }}>
                            <div class="container py-5">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="card mb-4">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-sm-3">
                                                        <p class="mb-0">Full Name</p>
                                                    </div>
                                                    <div class="col-sm-9">
                                                        <p class="text-muted mb-0">Johnatan Smith</p>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div class="row">
                                                    <div class="col-sm-3">
                                                        <p class="mb-0">Email</p>
                                                    </div>
                                                    <div class="col-sm-9">
                                                        <p class="text-muted mb-0">example@example.com</p>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div class="row">
                                                    <div class="col-sm-3">
                                                        <p class="mb-0">Phone</p>
                                                    </div>
                                                    <div class="col-sm-9">
                                                        <p class="text-muted mb-0">(097) 234-5678</p>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div class="row">
                                                    <div class="col-sm-3">
                                                        <p class="mb-0">Mobile</p>
                                                    </div>
                                                    <div class="col-sm-9">
                                                        <p class="text-muted mb-0">(098) 765-4321</p>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div class="row">
                                                    <div class="col-sm-3">
                                                        <p class="mb-0">Address</p>
                                                    </div>
                                                    <div class="col-sm-9">
                                                        <p class="text-muted mb-0">Bay Area, San Francisco, CA</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div >
                                </div >
                            </div >
                        </section >
                    </div >
                    <div className='col-9 '></div>
                    <div className='col-7  d-block d-lg-none'></div>
                    <div className='update-info btn btn-primary col-1 m-5' >Cập nhật</div>
                </div >
            </div >
        </>
    )
};

export default Profile;